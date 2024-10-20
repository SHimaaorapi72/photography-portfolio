require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const photoRoutes = require("./routes/photoRoutes");
const contactRoutes = require("./routes/contactRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require('./routes/serviceRoutes');
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);

// Error Handling Middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Connect to Database and Start Server
const PORT = process.env.PORT || 5015;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
