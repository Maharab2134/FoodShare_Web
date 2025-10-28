require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const User = require("./models/User");
const { profileSearch } = require("./controllers/profileController");
const {
  addFood,
  getClaimedFood,
  getDonatedFood,
} = require("./controllers/foodController");
const app = express();
const userRoutes = require("./routes/userRoutes");
// Middleware
// Allowed origins for CORS. In production set ALLOWED_ORIGINS env var (comma-separated).
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
  : [
      "https://foodshare-ir6g.onrender.com", // production frontend
      "http://localhost:5173", // Vite default
      "http://127.0.0.1:5173",
      "http://localhost:3000", // common dev port
    ];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses form data (important for `FormData` from frontend)
// app.use((req, res, next) => {
//   console.log("🔥 Incoming Request:");
//   console.log("➡️ Headers:", req.headers);
//   console.log("➡️ Method:", req.method);
//   console.log("➡️ URL:", req.originalUrl);
//   console.log("➡️ Body:", req.body);
//   console.log("➡️ Query:", req.query);
//   console.log("➡️ Params:", req.params);
//   next();
// });
// Routes
// Database Connection

const path = require("path");

// ✅ Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/profile/:email", profileSearch);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
