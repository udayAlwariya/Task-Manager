const User = require("../models/user");

async function allUsers(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const users = await User.find(
      { 
        _id: { $ne: req.user._id },  
        role: { $ne: "admin" }        
      },
      "_id name email role blocked" 
    );

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateUserRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
        success: true,
        user
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  allUsers,
  updateUserRole,
  deleteUser
};
