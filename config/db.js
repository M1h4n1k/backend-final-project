const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://login:password@host/db";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB with Mongoose");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = connectDB;
