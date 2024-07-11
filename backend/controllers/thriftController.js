const cloudinary = require('../config/cloudinaryConfig');
const ThriftItem = require('../models/ThriftItem');
const ItemImage = require('../models/ItemImage'); 

exports.addThriftItem = async (req, res) => {
  const {
    title, category, description, brand, size, color, material, condition, price, original_price,
    location, tags, shipping_options, return_policy, sustainability_impact, ar_tag_url, ar_description
  } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  try {
   
    const thriftItem = await ThriftItem.create({
      title, category, description, brand, size, color, material, condition, price, original_price,
      location, tags, shipping_options, return_policy, sustainability_impact, ar_tag_url, ar_description
    });

    const fileUrls = [];
    for (const file of req.files) {
      try {
        const filePath = file.path;
        const uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
        await ItemImage.create({ thrift_item_id: thriftItem.id, image_url: uploadResult.secure_url });
        fileUrls.push(uploadResult.secure_url);
        fs.unlinkSync(filePath); 
      } catch (uploadError) {
        console.error('Error uploading file to Cloudinary:', uploadError);
      }
    }

    res.status(201).json({ message: 'Thrift item added successfully', itemId: thriftItem.id, fileUrls });
  } catch (error) {
    console.error('Error adding thrift item:', error);
    res.status(500).json({ message: 'Error adding thrift item', error });
  }
};
exports.getThriftItem = async (req, res) => {
    const { id } = req.params;
  
    try {
      
      const thriftItem = await ThriftItem.findOne({ where: { id } });
  
      if (!thriftItem) {
        return res.status(404).json({ message: 'Thrift item not found' });
      }
  
     
      const images = await ItemImage.findAll({ where: { thrift_item_id: id } });
  
      const imageUrls = images.map(image => image.image_url);
  
    
      const thriftItemWithImages = { ...thriftItem.dataValues, images: imageUrls };
  
      res.status(200).json(thriftItemWithImages);
    } catch (error) {
      console.error('Error fetching thrift item:', error);
      res.status(500).json({ message: 'Error fetching thrift item', error });
    }
  };
  