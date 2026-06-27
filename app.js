const express = require("express");
const cors = require("cors");

// const app = express();
const productRoute = require("./Routes/productRoute")
const serviceRoute = require("./Routes/serviceRoute")
const authRoute = require("./Routes/authRoute")
const otpRoute = require("./Routes/otpRoute")
const conversationRoute = require("./Routes/conversationRoute")
const imageRoute = require("./Routes/allImageRoute")
// const mailRoutes = require("./Routes/mailRoute")
const banner = require("./Routes/bannerRoute")
const admin = require("./Routes/adminRoute")
const user = require("./Routes/userRoutes")
// const mail = require("./Routes/mailRoute")
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.json());
app.use("/api/v1", productRoute);
app.use("/api/v1", serviceRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", otpRoute);
app.use("/api/v1", conversationRoute);
app.use("/api/v1", imageRoute);
// app.use("/api/v1", mailRoutes);
app.use("/api/v1", banner);
app.use("/api/v1", admin);
app.use("/api/v1", user);



module.exports = app