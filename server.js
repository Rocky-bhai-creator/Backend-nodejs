const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app")
dotenv.config({path:"./config.env"})
const port = process.env.PORT
const DB = process.env.DATABASE

mongoose.connect(DB).then((config)=>{
    console.log("DB Connection Successful");
})
app.listen(port, () =>{
    console.log(`Server Running On PORT ${port}`);
})