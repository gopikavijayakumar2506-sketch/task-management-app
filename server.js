const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

app.use(authRoutes);
app.use(taskRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Error:");
    console.log(err);
});

// Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});