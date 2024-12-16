const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

const authenticate = (roles) => {
  return (req, res, next) => {
    // Extract the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = decoded;
    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    next();
  };
};

module.exports = authenticate;
