// Small SMTP verification helper for local testing
// Usage: node test-smtp.js
// It will load variables from .env (if present) via dotenv

require("dotenv").config();
const nodemailer = require("nodemailer");

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

if (!user || !pass) {
  console.error("EMAIL_USER or EMAIL_PASS not set in environment or .env");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});

console.log("Verifying SMTP connection for user:", user);
transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP verification failed:", err);
    process.exit(1);
  }
  console.log("SMTP verification succeeded:", success);
  process.exit(0);
});
