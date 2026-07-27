const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// ================================
// Register User
// ================================

const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================================
// Login User
// ================================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        console.log("EMAIL:", email);
        console.log("PASSWORD:", password);

        const user = await User.findOne({ email });

        console.log("USER FOUND:", user);

        if (!user) {

            return res.status(401).json({
                message: "Invalid Email or Password",
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("PASSWORD MATCH:", isMatch);

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Email or Password",
            });

        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });

    }

};

// ================================
// Forgot Password
// ================================

const forgotPassword = async (req, res) => {

  try {
    console.log("Forgot Password API Called");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS)
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpire =
      Date.now() + 60 * 60 * 1000;

    await user.save();

    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS,

      },

    });

    console.log("CLIENT_URL:", process.env.CLIENT_URL);

    const resetURL =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    console.log("Reset URL:", resetURL);

    const mailOptions = {

      from: process.env.EMAIL_USER,

      to: user.email,

      subject: "TaskFlow Password Reset",

      html: `
      <h2>Password Reset</h2>

      <p>Hello ${user.name},</p>

      <p>You requested to reset your password.</p>

      <p>
      Click below:
      </p>

      <a href="${resetURL}">
      Reset Password
      </a>

      <p>
      This link expires in 1 hour.
      </p>
      `,

    };

    await transporter.sendMail(mailOptions);

    res.json({
      message:
        "Password reset link sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// ================================
// Reset Password
// ================================

const resetPassword = async (req, res) => {

  try {

    const { token } = req.params;

    const { password } = req.body;

    const user = await User.findOne({

      resetPasswordToken: token,

      resetPasswordExpire: {
        $gt: Date.now(),
      },

    });

    if (!user) {

      return res.status(400).json({

        message:
          "Invalid or Expired Reset Link",

      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = null;

    user.resetPasswordExpire = null;

    await user.save();

    res.json({

      message:
        "Password reset successfully",

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

module.exports = {

  registerUser,

  loginUser,

  forgotPassword,

  resetPassword,

};