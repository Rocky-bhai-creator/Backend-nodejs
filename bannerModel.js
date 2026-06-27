const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
  title:{
    type: String,
  },

  description:{
    type: String,
  },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);