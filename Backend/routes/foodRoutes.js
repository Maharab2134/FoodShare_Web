const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addFood,
  getAvailableFood,
  claimFood,
  getDonatedFood,
  getClaimedFood,
  updateClaimedStatus,
} = require("../controllers/foodController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = multer();
router.post("/add", authMiddleware, upload.none(), addFood);
router.get("/available", getAvailableFood);
router.post("/claim/:id", authMiddleware, claimFood);
router.get("/donated/:email", authMiddleware, getDonatedFood);
router.get("/claimed/:email", authMiddleware, getClaimedFood);
router.put("/claim/:id", authMiddleware, claimFood);
// Update claimed item status (pickup / in_transit / delivered)
router.put("/claimed/:id/status", authMiddleware, updateClaimedStatus);
module.exports = router;
