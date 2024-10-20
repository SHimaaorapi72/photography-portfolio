const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../models/Project');

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination for uploaded files
  },
  filename: (req, file, cb) => {
    // Use timestamp and original filename for the new file name
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// GET route to fetch all Projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST route to create a new Project
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, price } = req.body;

  // Generate the image URL
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  // Create a new Project object
  const Project = new Project({
    title,
    description,
    price,
    image: imageUrl, // Store the full URL of the uploaded image
  });

  try {
    // Save the Project to the database
    const newProject = await Project.save();
    res.status(201).json({ message: "Project created successfully!", project: newProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', upload.single('image'), async (req, res) => {
  const { title, description, price } = req.body;
  const projectId = req.params.id;

  const updatedData = {
    title,
    description,
    price,
  };

  if (req.file) {
    updatedData.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(projectId, updatedData, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route لحذف مشروع
router.delete('/:id', async (req, res) => {
  const projectId = req.params.id;

  try {
    await Project.findByIdAndDelete(projectId);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
