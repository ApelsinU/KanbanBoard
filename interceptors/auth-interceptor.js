const config = require("../config/default.json");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No authorization" });

    req.user = jwt.verify(token, config.get("jwtSecret"));
    next();
  } catch (e) {
    res.status(401).json({ message: "No authorization" });
  }
};
