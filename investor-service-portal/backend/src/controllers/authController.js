const Investor = require('../../models/Investors');
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

    const user = await Investor.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "Password not set for user" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };