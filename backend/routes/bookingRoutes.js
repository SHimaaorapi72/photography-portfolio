const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

// Submit a booking request
// Booking Routes (routes/bookingRoutes.js)
router.post("/", async (req, res) => {
  const { name, email, phone, date, message } = req.body;

  if (!name || !email || !phone || !date) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const booking = new Booking({ name, email, phone, date, message });
    await booking.save();
    res.status(201).json({ message: "Booking submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings (optional)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
