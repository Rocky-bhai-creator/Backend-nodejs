const User = require("../Models/userModel");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const updateData = {
      name,
      email,
      role
    };

    // If password is provided → hash it
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};