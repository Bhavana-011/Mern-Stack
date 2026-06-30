const Investor = require('../../models/Investors');
const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//  REGISTER
const register = async (req, res) => {
  try {
    const {
      investorId,
      fullName,
      email,
      password,
      phone,
      panNumber,
      dob,
      bankDetails,
      nominee,
      address
    } = req.body;

    const existingUser = await Investor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);


    const user = new Investor({
      investorId,
      fullName,
      email,
      password: hashed,
      phone,
      panNumber,
      dob,
      bankDetails,
      nominee,
      address
    });

    await user.save();
    console.log(hashed)

    res.json({
      success: true,
      message: "User registered "
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

//  LOGIN


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  1. check investor
    let user = await Investor.findOne({ email });
    let role = "INVESTOR";

    //  2. if not investor → check admin roles
    if (!user) {
      user = await Admin.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      role = user.role;  // ADMIN / MANAGER / EXECUTIVE
    }

    //  compare password
    const valid = await bcrypt.compare(
      password,
      role === "INVESTOR" ? user.password : user.passwordHash
    );

    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //  create token
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
      role
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };