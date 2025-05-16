const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, country } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !country ||
      name === "" ||
      email === "" ||
      password === "" ||
      country === ""
    ) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      country,
    });

    await newUser.save();

    const payload = { user: { id: newUser._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(201).json({
      message: "Registration Successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        country: newUser.country,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
      },
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const logout = async (req, res) => {
  res.cookie("token", "");
  return res.status(200).json({ message: "Logged Out Successfully" });
};

module.exports = { register, login, logout };
