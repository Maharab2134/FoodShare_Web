const Food = require("../models/Food");
const User = require("../models/User");
const claimed = require("../models/ClaimedFood");
const ClaimedFood = require("../models/ClaimedFood");
const DonatedFood = require("../models/DonatedFood");
const nodemailer = require("nodemailer");

exports.addFood = async (req, res) => {
  try {
    const {
      foodName,
      category,
      quantity,
      location,
      phone,
      latitude,
      longitude,
    } = req.body;

    const { email, name } = req.user;

    const foodData = {
      name: foodName,
      category: category,
      quantity: quantity,
      location: location,
      donorDetails: req.user.userId,
      donorName: name,
      donorContactNo: phone,
      latitude: latitude,
      longitude: longitude,
      emailid: email,
    };
    const food = new Food(foodData);
    const donatefood = new DonatedFood(foodData);
    await donatefood.save();
    await food.save();
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { donated: { foodItemId: food._id } },
    });
    // Persist a notification for reconnecting volunteers and emit realtime event
    try {
      const io = req.app && req.app.locals && req.app.locals.io;
      const Notification = require("../models/Notification");
      const payload = {
        id: food._id,
        name: food.name,
        title: `New donation: ${food.name}`,
        category: food.category,
        quantity: food.quantity,
        location: food.location,
        latitude: food.latitude,
        longitude: food.longitude,
        donorName: food.donorName,
        donorContactNo: food.donorContactNo,
      };

      // Save to notifications (will expire automatically via TTL)
      try {
        await Notification.create({
          title: payload.title,
          name: payload.name,
          foodId: food._id,
          category: payload.category,
          quantity: payload.quantity,
          location: payload.location,
          image: food.image,
          donorId: food.donorDetails,
          extra: { donorContactNo: food.donorContactNo },
        });
      } catch (nerr) {
        console.error("Failed to save notification:", nerr.message);
      }

      if (io) {
        io.emit("new_donation", payload);
      }
    } catch (err) {
      console.error("Failed to emit new_donation", err);
    }

    res.status(201).json({ message: "Food added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getClaimedFood = async (req, res) => {
  try {
    const { email } = req.params;

    // Find all food items where `emailid` matches the requested email
    const claimedFood = await ClaimedFood.find({ emailid: email })
      .select(
        "name category quantity location image donorName donorContactNo status claimedAt latitude longitude donorDetails"
      )
      .populate("donorDetails", "name email phone") // 👈 Add this line to get donor info
      .exec();

    console.log(claimedFood);

    if (!claimedFood || claimedFood.length === 0) {
      return res
        .status(404)
        .json({ message: "No claimed food found for this email." });
    }

    res.json(claimedFood); // Send claimed food as response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableFood = async (req, res) => {
  try {
    const foodItems = await Food.find({ status: "Available" }).populate(
      "donorDetails"
    ); // Fetch all donor details
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ensure you import the Food model

exports.claimFood = async (req, res) => {
  const { id } = req.params;
  try {
    // Atomic update: only claim if status is still 'Available'
    const updated = await Food.findOneAndUpdate(
      { _id: id, status: "Available" },
      {
        $set: {
          status: "Claimed",
          claimedBy: req.user.userId,
          claimedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(409).json({
        message: "This donation has already been claimed by someone else.",
      });
    }

    const user = await User.findById(req.user.userId);
    const claimerEmail = user.email;
    const claimerName = user.name;
    const claimerPhone = user.phone;
    const claimerAddress = user.address;

    const claimedFood = new claimed({
      name: updated.name,
      category: updated.category,
      quantity: updated.quantity,
      location: updated.location,
      image: updated.image,
      donorDetails: updated.donorDetails,
      donorName: updated.donorName,
      donorContactNo: updated.donorContactNo,
      latitude: updated.latitude,
      longitude: updated.longitude,
      emailid: claimerEmail, // Store claimer's email
      claimerName: claimerName,
      status: "Claimed",
      claimedAt: new Date(),
    });

    await claimedFood.save();
    await Food.findByIdAndDelete(id);

    // Update DonatedFood record if present
    await DonatedFood.findOneAndUpdate(
      {
        name: updated.name,
        donorDetails: updated.donorDetails,
        status: "Donated",
      },
      {
        $set: {
          status: "Claimed",
          claimerName: claimerName,
          claimedAt: new Date(),
          claimerEmail: claimerEmail,
        },
      }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail", // or any SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Food Share App" <${process.env.EMAIL_USER}>`,
      to: updated.emailid,
      subject: "Your food has been claimed!",
      html: `
        <h3>Food Claimed: ${updated.name}</h3>
        <p><strong>Claimer Name:</strong> ${claimerName}</p>
        <p><strong>Email:</strong> ${claimerEmail}</p>
        <p><strong>Phone:</strong> ${claimerPhone}</p>
        <p><strong>Location:</strong> ${claimerAddress}</p>
        <hr>
        <p>Please coordinate the pickup/delivery. Thank you for donating!</p>
      `,
    };
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
    let emailError = null;
    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully!");
    } catch (emailErr) {
      // Log email error but don't fail the entire claim operation.
      emailError = emailErr;
      console.error("❌ Failed to send email:", emailErr);
    }

    // Emit event to notify volunteers the donation was claimed
    try {
      const io = req.app && req.app.locals && req.app.locals.io;
      if (io) {
        io.emit("donation_claimed", { id, claimerName, claimerEmail });
      }
    } catch (err) {
      console.error("Failed to emit donation_claimed", err);
    }

    // Remove any persisted notification for this food so reconnecting volunteers won't see it
    try {
      const Notification = require("../models/Notification");
      await Notification.deleteMany({ foodId: id });
    } catch (nerr) {
      console.error(
        "Failed to remove notification for claimed food:",
        nerr.message
      );
    }

    // Always return success for the claim operation; include email error details when available.
    const responsePayload = { message: "Food claimed successfully!" };
    if (emailError) responsePayload.emailError = emailError.message;
    res.status(200).json(responsePayload);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error claiming food", error: error.message });
  }
};

exports.getDonatedFood = async (req, res) => {
  try {
    const { email } = req.params;

    // Find all food items where `emailid` matches the donor's email
    const donatedFood = await DonatedFood.find({ emailid: email }).select(
      "name category quantity location image status donorName donorContactNo latitude longitude createdAt claimerEmail claimerName"
    );
    console.log(donatedFood);
    if (!donatedFood || donatedFood.length === 0) {
      return res
        .status(404)
        .json({ message: "No donated food found for this email." });
    }

    res.json(donatedFood); // Send donated food as response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status for a claimed food (picked up / in_transit / delivered)
exports.updateClaimedStatus = async (req, res) => {
  try {
    const { id } = req.params; // id of ClaimedFood document
    const { status } = req.body; // expected values: 'PickedUp', 'InTransit', 'Delivered'

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    // Find the claimed item
    const claimedItem = await ClaimedFood.findById(id);
    if (!claimedItem) {
      return res.status(404).json({ message: "Claimed item not found." });
    }

    // Only the claimer (volunteer) or admin should be able to update
    if (
      String(claimedItem.claimedBy || "") !== String(req.user.userId) &&
      req.user.role !== "admin"
    ) {
      // Allow if request user email matches claimer email (fallback)
      if (claimedItem.emailid !== req.user.email) {
        return res
          .status(403)
          .json({ message: "Not authorized to update status." });
      }
    }

    // Update fields based on status
    const prevStatus = claimedItem.status;
    claimedItem.status = status;
    if (status === "PickedUp") claimedItem.pickedUpAt = new Date();
    if (status === "InTransit") claimedItem.inTransitAt = new Date();
    if (status === "Delivered") claimedItem.deliveredAt = new Date();

    await claimedItem.save();

    // Keep DonatedFood in sync if present
    try {
      await DonatedFood.findOneAndUpdate(
        { donorDetails: claimedItem.donorDetails, name: claimedItem.name },
        { $set: { status: status } }
      );
    } catch (err) {
      // non-fatal
      console.error("Failed to update DonatedFood status", err);
    }

    // Emit socket event about status change
    try {
      const io = req.app && req.app.locals && req.app.locals.io;
      if (io) {
        io.emit("status_update", {
          id: claimedItem._id,
          status,
          claimerName: claimedItem.claimerName,
          claimerEmail: claimedItem.emailid,
        });
      }
    } catch (err) {
      console.error("Failed to emit status_update", err);
    }

    res.json({ message: "Status updated", status, prevStatus });
  } catch (error) {
    console.error("updateClaimedStatus error", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
