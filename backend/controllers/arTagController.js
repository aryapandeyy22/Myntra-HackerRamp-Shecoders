const { ThriftItem } = require('../models'); 
const express = require('express');
const router = express.Router();
const uuid = require('uuid'); 

exports.ArTaggeneration = async (req, res) => {
  try {
    const { thriftItemId } = req.body; 
    
    const arTagUrl = `https://example.com/ar-tags/${uuid.v4()}`;

   
    const arDescription = `AR tag for thrift item ID ${thriftItemId}`;

    res.status(200).json({ arTagUrl, arDescription });
  } catch (error) {
    console.error('Error generating AR tag:', error);
    res.status(500).json({ message: 'Error generating AR tag', error });
  }
};




// GET AR tag details by ThriftItem ID
exports.getArTagByThriftItemId = async (req, res) => {
  const { id } = req.params;
  try {
    const thriftItem = await ThriftItem.findByPk(id);
    if (!thriftItem) {
      return res.status(404).json({ message: 'Thrift item not found' });
    }
    const arTag = {
      arTagUrl: thriftItem.ar_tag_url,
      arDescription: thriftItem.ar_description
    };
    res.status(200).json(arTag);
  } catch (error) {
    console.error('Error retrieving AR tag:', error);
    res.status(500).json({ message: 'Error retrieving AR tag', error });
  }
};

// POST AR tag details for ThriftItem
exports.createArTagForThriftItem = async (req, res) => {
  const { id } = req.params;
  const { arTagUrl, arDescription } = req.body;
  try {
    const thriftItem = await ThriftItem.findByPk(id);
    if (!thriftItem) {
      return res.status(404).json({ message: 'Thrift item not found' });
    }
    await thriftItem.update({
      ar_tag_url: arTagUrl,
      ar_description: arDescription
    });
    res.status(200).json({ message: 'AR tag created/updated successfully', thriftItem });
  } catch (error) {
    console.error('Error creating/updating AR tag:', error);
    res.status(500).json({ message: 'Error creating/updating AR tag', error });
  }
};

// DELETE AR tag for ThriftItem
exports.deleteArTagForThriftItem = async (req, res) => {
  const { id } = req.params;
  try {
    const thriftItem = await ThriftItem.findByPk(id);
    if (!thriftItem) {
      return res.status(404).json({ message: 'Thrift item not found' });
    }
    await thriftItem.update({
      ar_tag_url: null,
      ar_description: null
    });
    res.status(200).json({ message: 'AR tag deleted successfully', thriftItem });
  } catch (error) {
    console.error('Error deleting AR tag:', error);
    res.status(500).json({ message: 'Error deleting AR tag', error });
  }
};
