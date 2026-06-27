const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email:{
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    otp:{
      type: String,
    },

    otpExpiry:{
      type: Date,
      // required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true   // createdAt & updatedAt automatically
  }
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// 4️⃣ Password comparison method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 5️⃣ Export model
module.exports = mongoose.model("User", userSchema);