const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email.trim(),
      subject: "Test Mail",
      text: "Hello from Nodemailer",
    });

    res.json({ message: "Email sent", info });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};