const express = require('express');
const router = express.Router();
const multer = require('multer');
const Service = require('../models/services');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage });

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new service
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, price } = req.body;

  // Ensure the image is uploaded
  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }

  // Create service with full URL for the image
  const service = new Service({
    title,
    description,
    price,
    image: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` // Generate the full URL for the image
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/:id', upload.single('image'), async (req, res) => {
  const { title, description, price } = req.body;
  let imageUrl = null;

  // Check if an image is uploaded
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, price, image: imageUrl },
      { new: true } // Return the updated document
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a service
router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
