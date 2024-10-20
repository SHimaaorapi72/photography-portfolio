const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// Endpoint to submit contact form
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contactMessage = new Contact({ name, email, message });
    await contactMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get all contact messages (optional)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
