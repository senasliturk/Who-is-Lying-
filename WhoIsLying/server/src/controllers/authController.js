const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function isEmailValid(email) {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

exports.register = async (req, res) => {
  try {
    console.log("REGISTER req.body:", req.body);
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
     return res.status(400).json({ message: "Username, email, and password are required." });
    }


    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required." });
    }
    if (!isEmailValid(email)) {
      return res.status(400).json({ message: "Enter a valid email address." });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ message: "The password must be at least 6 characters long." });
    }

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(409).json({ message: "This username or email is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });

    return res.status(201).json({
      message: "Registration successful ",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ message: "Register error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email, and password are required." });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET does not exist in the .env file." });
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "7d" });

    return res.json({
      message: "Login successful ",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ message: "Login error", error: err.message });
  }
};
