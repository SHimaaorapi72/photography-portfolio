
const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });


router.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const imageUrl = req.file.path;
  try {
    const photo = new Photo({ title, description, imageUrl, uploadedBy: req.user.userId });
    await photo.save();
    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().populate('uploadedBy', 'name');
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
