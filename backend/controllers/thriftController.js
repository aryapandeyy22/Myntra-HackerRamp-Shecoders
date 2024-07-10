const cloudinary = require('../config/cloudinaryConfig');
const db = require('../config/dbConfig');
const { promisify } = require('util');
const fs = require('fs');

const query = promisify(db.query).bind(db);

exports.addThriftItem = async (req, res) => {
  const {
    title, category, description, brand, size, color, material, condition, price, originalPrice,
    location, tags, shippingOptions, returnPolicy, sustainabilityImpact, arTagUrl, arDescription
  } = req.body;

  try {
  
    const result = await query(
      'INSERT INTO thrift_items (title, category, description, brand, size, color, material, condition, price, original_price, location, tags, shipping_options, return_policy, sustainability_impact, ar_tag_url, ar_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [title, category, description, brand, size, color, material, condition, price, originalPrice, location, tags, shippingOptions, returnPolicy, sustainabilityImpact, arTagUrl, arDescription]
    );
    const thriftItemId = result.insertId;

  
    const fileUrls = [];
    for (const file of req.files) {
      const filePath = file.path;
      const uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
      await query('INSERT INTO item_images (thrift_item_id, image_url) VALUES (?, ?)', [thriftItemId, uploadResult.secure_url]);
      fileUrls.push(uploadResult.secure_url);

  
      fs.unlinkSync(filePath);
    }

    res.status(201).json({ message: 'Thrift item added successfully', itemId: thriftItemId, fileUrls });
  } catch (error) {
    res.status(500).json({ message: 'Error adding thrift item', error });
  }
};
