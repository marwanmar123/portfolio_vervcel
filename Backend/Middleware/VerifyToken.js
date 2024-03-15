const jwt = require("jsonwebtoken");
const User = require("../Models/Profile");
require("dotenv").config();

const VerifyToken = async (req, res, next) => {
  //   console.log(req.cookies);
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(400).json({ message: "user makanch" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: "token makaynch" });
  }
};

module.exports = VerifyToken;
