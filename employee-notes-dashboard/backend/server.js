const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Employee Notes API is running" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in your .env file.");
  console.error("   Please add your MongoDB Atlas connection string.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
