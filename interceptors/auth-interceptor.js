const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = JSON.parse(req.headers.authorization).token;
    const secret = config.get("jwtSecret");

    if (!token) return res.status(401).json({ message: "No authorization" });

    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
    next();
  } catch (e) {
    res.status(401).json({ message: "No authorization" });
  }
};
