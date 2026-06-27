const User = require("../Models/userModel");

// PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};