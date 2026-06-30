const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




//  Register Admin / Manager / Executive
const registerAdmin = async (req, res) => {
  try {
    const { adminId, name, email, password, role } = req.body;

    //  validate role
    if (!["ADMIN", "MANAGER", "EXECUTIVE"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const hash = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      adminId,
      name,
      email,
      passwordHash: hash,
      role
    });

    res.json({
      success: true,
      message: `${role} registered `,
      admin
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body; 

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);

    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
      role:admin.role
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerAdmin, loginAdmin };