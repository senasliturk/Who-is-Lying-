const jwt = require("jsonwebtoken");

function authRequired(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Token required. (Authorization: Bearer <token>)" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET does not exist in the .env file." });
    }

    const payload = jwt.verify(token, secret);
    req.user = { userId: payload.userId };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired tokens." });
  }
}

module.exports = authRequired;

