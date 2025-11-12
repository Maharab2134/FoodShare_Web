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
const http = require("http");
const { Server } = require("socket.io");
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
      // Allow requests with no origin (curl, Postman, mobile apps)
      if (!origin) return callback(null, true);

      // If origin is exactly in allowedOrigins, allow it
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }

      // Allow any localhost or 127.0.0.1 with any port (developer convenience)
      try {
        const url = new URL(origin);
        if (
          (url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
          (url.protocol === "http:" || url.protocol === "https:")
        ) {
          return callback(null, true);
        }
      } catch (e) {
        // If parsing fails, fall through to reject
      }

      return callback(new Error("Not allowed by CORS: " + origin));
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

// Validate required environment variables early with helpful messages
const requiredEnvs = ["MONGO_URI", "JWT_SECRET"];
const missing = requiredEnvs.filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.error(
    `Missing required environment variables in Backend/.env: ${missing.join(
      ", "
    )}. ` +
      "Add them and restart the server. Example: MONGO_URI=mongodb://localhost:27017/foodshare, JWT_SECRET=your_jwt_secret"
  );
  // exit so developer notices and fixes .env before server attempts to connect
  process.exit(1);
}

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

// Create HTTP server and socket.io for realtime notifications
const server = http.createServer(app);
// For development allow all origins to simplify socket testing. In production, set ALLOWED_ORIGINS env.
const ioCorsOptions =
  process.env.NODE_ENV === "production"
    ? { origin: allowedOrigins, methods: ["GET", "POST"], credentials: true }
    : { origin: true, methods: ["GET", "POST"], credentials: true };
const jwt = require("jsonwebtoken");
const Notification = require("./models/Notification");
const Food = require("./models/Food");

const io = new Server(server, { cors: ioCorsOptions });

// expose io to routes/controllers via app.locals
app.locals.io = io;

io.on("connection", async (socket) => {
  console.log("Socket connected:", socket.id);

  // Try to authenticate the socket using token passed in handshake auth
  try {
    const token = socket.handshake.auth && socket.handshake.auth.token;
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // Attach user info to socket for convenience
      socket.user = payload;

      console.log("Socket authenticated for user:", payload.userId);

      // If the user is a volunteer, join them to a personal room and optionally area rooms
      try {
        const dbUser = await User.findById(payload.userId).lean();
        if (dbUser && dbUser.role === "volunteer") {
          // personal room
          socket.join(`volunteer:${payload.userId}`);

          // Optionally join area rooms if the user has an address/area stored in profile
          if (dbUser.address) {
            // crude area identifier (could be improved to geohash)
            const areaKey = dbUser.address.split(",")[0].trim();
            socket.join(`area:${areaKey}`);
          }

          // Send recent notifications (missed while offline)
          try {
            // Fetch recent notifications, but only include those whose Food is still available
            const recent = await Notification.find({})
              .sort({ createdAt: -1 })
              .limit(100)
              .lean();

            const filtered = [];
            for (const n of recent) {
              if (!n.foodId) {
                // If no foodId recorded, include as a fallback
                filtered.push(n);
                continue;
              }
              try {
                const exists = await Food.exists({
                  _id: n.foodId,
                  status: "Available",
                });
                if (exists) filtered.push(n);
              } catch (fe) {
                // on error, skip this notification
                console.error(
                  "Failed to verify Food existence for notification:",
                  fe.message
                );
              }
            }

            if (filtered.length > 0) {
              socket.emit("missed_notifications", filtered);
            }
          } catch (err) {
            console.error("Failed to fetch recent notifications:", err);
          }
        }
      } catch (err) {
        console.error("Failed to lookup user for socket auth:", err.message);
      }
    }
  } catch (err) {
    // Token verify failed — we won't block the connection but the socket will be unauthenticated
    console.warn("Socket authentication failed:", err.message);
  }

  socket.on("subscribe_area", (area) => {
    socket.join(`area:${area}`);
  });
  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", socket.id, "reason:", reason);
  });
  socket.on("connect_error", (err) => {
    console.warn("Socket connect_error:", err.message);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
