const bcrypt = require("bcrypt");
const config = require("config");
const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../database/User");

const router = Router();
module.exports = router


// api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter valid email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists,
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid login data",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({
          message: "User has not found",
        });
      }

      const isMatch = await bcrypt.compare(user.password, password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password, try again" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong..." });
    }
  }
);

// api/auth/register
router.post(
  "/register",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password must be at least 6 symbols").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid registration data",
        });
      }

      const { email, password } = req.body;

      const isUser = await User.findOne({ email: email });
      if (isUser) {
        res
          .status(400)
          .json({ message: "User with the same email already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 17);

      const user = new User({ email: email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User has been successfully created" });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong..." });
    }
  }
);

module.exports = router;
