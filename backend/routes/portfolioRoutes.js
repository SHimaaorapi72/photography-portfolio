const express = require('express');
const Photo = require('../models/Photo');
const router = express.Router();

router.get('/', async (req, res) => {
  const photos = await Photo.find();
  res.json(photos);
});

module.exports = router;
