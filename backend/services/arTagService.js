const { createCanvas, loadImage } = require('canvas');
const crypto = require('crypto');
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');
const path = require('path');


exports.generateArTagUrl = async (productId) => {
  
  const arTagIdentifier = crypto.randomBytes(16).toString('hex');

  
  const arTagImagePath = path.join(__dirname, '..', 'uploads', `${arTagIdentifier}.png`);

 
  await createArTagImage(arTagIdentifier, arTagImagePath);

  
  const uploadResult = await cloudinary.uploader.upload(arTagImagePath, {
    public_id: `ar-tags/${arTagIdentifier}`,
    resource_type: 'image'
  });

  
  fs.unlinkSync(arTagImagePath);

  
  return uploadResult.secure_url;
};


exports.generateArDescription = (product) => {
  
  return `Experience the ${product.title} in augmented reality! See how it fits and looks in your space.`;
};


const createArTagImage = async (text, outputPath) => {
  const width = 400;
  const height = 400;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Draw a simple AR tag with text
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);

  context.fillStyle = '#000000';
  context.font = 'bold 30pt Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('AR Tag', width / 2, height / 2 - 30);
  context.fillText(text, width / 2, height / 2 + 30);

  // Save the image to the output path
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
};
