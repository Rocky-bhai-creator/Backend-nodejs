const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await userModel.findOne({
    email,
    otp: otp.toString(),
    otpExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.password = newPassword;
  user.otp = undefined;
  user.otpExpire = undefined;

  await user.save();

  res.status(200).json({ message: "Password reset successful" });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3. Create user (password hashed in model)
    const user = await userModel.create({
      name,
      email,
      password
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Signup failed",
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2. Find user & explicitly fetch password
    const user = await userModel.findOne({ email }).select("+password");
 
    if (!user) {
      return res.status(401).json({ message: "user does not exist" });
    }

    // 3. Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  user.otp = otp;
  user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 min

  await user.save(); // 🔥 CRITICAL

  console.log("Saved OTP:", user.otp);

  res.status(200).json({
    message: "OTP sent successfully",
    otp // only for testing, REMOVE in production
  });
};

exports.getUsers = async (req, res) => {
  try{
    const AllUsers = await userModel.find()
            res?.status(200).json({
            status: "Success",
            data:{
                AllUsers,
            },
        });

    }catch(err){
         res?.status(400).json({
            status: "Fail",
            message: err?.message,
    });
    }
};