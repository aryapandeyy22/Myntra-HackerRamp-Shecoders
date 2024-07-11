const cloudinary = require('../config/cloudinaryConfig');
const db = require('../config/dbConfig');
const { promisify } = require('util');
const fs = require('fs');

const query = promisify(db.query).bind(db);

exports.addThriftItem = async (req, res) => {
  const {
    title, category, description, brand, size, color, material, condition, price, original_price,
    location, tags, shipping_options, return_policy, sustainability_impact, ar_tag_url, ar_description
  } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  try {
    const result = await query(
      'INSERT INTO thrift_items (title, category, description, brand, size, color, material, `condition`, price, original_price, location, tags, shipping_options, return_policy, sustainability_impact, ar_tag_url, ar_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [title, category, description, brand, size, color, material, condition, price, original_price, location, tags, shipping_options, return_policy, sustainability_impact, ar_tag_url, ar_description]
    );
    const thriftItemId = result.insertId;

    const fileUrls = [];
    for (const file of req.files) {
      try {
        const filePath = file.path;
        const uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
        await query('INSERT INTO item_images (thrift_item_id, image_url) VALUES (?, ?)', [thriftItemId, uploadResult.secure_url]);
        fileUrls.push(uploadResult.secure_url);
        fs.unlinkSync(filePath);
      } catch (uploadError) {
        console.error('Error uploading file to Cloudinary:', uploadError);
      }
    }

    res.status(201).json({ message: 'Thrift item added successfully', itemId: thriftItemId, fileUrls });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Error adding thrift item', error });
  }
};
exports.getThriftItem = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Fetch the thrift item details
      const thriftItemQuery = 'SELECT * FROM thrift_items WHERE id = ?';
      const thriftItemResults = await query(thriftItemQuery, [id]);
  
      if (thriftItemResults.length === 0) {
        return res.status(404).json({ message: 'Thrift item not found' });
      }
  
      const thriftItem = thriftItemResults[0];
  
      // Fetch the images associated with the thrift item
      const imagesQuery = 'SELECT image_url FROM item_images WHERE thrift_item_id = ?';
      const imagesResults = await query(imagesQuery, [id]);
  
      const images = imagesResults.map(image => image.image_url);
  
      // Combine the thrift item details with the images
      const thriftItemWithImages = { ...thriftItem, images };
  
      res.status(200).json(thriftItemWithImages);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Error fetching thrift item', error });
    }
  };