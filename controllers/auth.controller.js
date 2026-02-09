const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }


    await User.create({
      name,
      email,
      password 
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
  console.error("AUTH ERROR:", error);
  res.status(500).json({
    success: false,
    message: "Server error"
  });
}
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invaid Email"
      });
    }


    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }


    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {
  console.error("AUTH ERROR:", error);
  res.status(500).json({
    success: false,
    message: "Server error"
  });
}
};
