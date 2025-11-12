const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String },
    // reference to the original Food document (so we can verify availability)
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: false,
    },
    category: { type: String },
    quantity: { type: Number },
    location: { type: String },
    image: { type: String },
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    extra: { type: mongoose.Schema.Types.Mixed },
    area: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("Notification", notificationSchema);
