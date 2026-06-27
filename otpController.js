const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});


const accountsid = process.env.TWILIO_ACCOUNT_SID
const authtoken = process.env.TWILIO_AUTH_TOKEN
const verifyservicesid = process.env.TWILIO_VERIFY_SERVICE_SID

const client = twilio(accountsid, authtoken);

// Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required"
      });
    }

    const otp = await client.verify.v2
      .services(verifyservicesid)
      .verifications.create({
        to: phone,
        channel: "sms"
      });


    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      status: otp.status
    });

    
    // console.log("Generated OTP:", otp);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message
    });

  }
};


// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {

    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone and OTP are required"
      });
    }

    const verificationCheck = await client.verify.v2
      .services(verifyservicesid)
      .verificationChecks.create({
        to: phone,
        code: otp
      });

    if (verificationCheck.status === "approved") {

      return res.status(200).json({
        success: true,
        message: "OTP verified successfully"
      });

    } else {

      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });

    }

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "OTP verification failed",
      error: error.message
    });

  }
};