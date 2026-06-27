const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName:{
        type: String,
        required: true,
    },

    productPrice:{
        type: Number,
        required: true,
    },

    service_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
    },

    product_details:{
        type: String,
        required: true,
    },
},

{
    timestamps: true,
}
)

module.exports = mongoose.model("Product", productSchema)