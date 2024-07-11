const { ProductStory } = require('../models'); // Import Product Story model

// GET product story by ID
exports.getProductStoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const productStory = await ProductStory.findByPk(id);
    if (!productStory) {
      return res.status(404).json({ message: 'Product story not found' });
    }
    res.status(200).json(productStory);
  } catch (error) {
    console.error('Error retrieving product story:', error);
    res.status(500).json({ message: 'Error retrieving product story', error });
  }
};

// POST product story
exports.createProductStory = async (req, res) => {
  const { id } = req.params;
  const { storyText, storyImages } = req.body;
  try {
    const newProductStory = await ProductStory.create({
      thriftItemId: id,
      storyText,
      storyImages,
    });
    res.status(201).json({ message: 'Product story created successfully', productStory: newProductStory });
  } catch (error) {
    console.error('Error creating product story:', error);
    res.status(500).json({ message: 'Error creating product story', error });
  }
};

// PUT product story
exports.updateProductStory = async (req, res) => {
  const { id } = req.params;
  const { storyText, storyImages } = req.body;
  try {
    const productStory = await ProductStory.findByPk(id);
    if (!productStory) {
      return res.status(404).json({ message: 'Product story not found' });
    }
    await productStory.update({
      storyText,
      storyImages,
    });
    res.status(200).json({ message: 'Product story updated successfully', productStory });
  } catch (error) {
    console.error('Error updating product story:', error);
    res.status(500).json({ message: 'Error updating product story', error });
  }
};

// DELETE product story
exports.deleteProductStory = async (req, res) => {
  const { id } = req.params;
  try {
    const productStory = await ProductStory.findByPk(id);
    if (!productStory) {
      return res.status(404).json({ message: 'Product story not found' });
    }
    await productStory.destroy();
    res.status(200).json({ message: 'Product story deleted successfully' });
  } catch (error) {
    console.error('Error deleting product story:', error);
    res.status(500).json({ message: 'Error deleting product story', error });
  }
};
