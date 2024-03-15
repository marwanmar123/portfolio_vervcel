require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const auth = require("./Controllers/AuhtController");
const profile = require("./Controllers/ProfileController");
const category = require("./Controllers/CategoryController");
const skill = require("./Controllers/SkillController");
const project = require("./Controllers/ProjectController");
const contact = require("./Controllers/ContactController");

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server rah mrani t7t lpor ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error hna", error);
  });

app.get("/", (req, res) => res.send("hello server is running"));
app.use("/api", auth);
app.use("/api", profile);
app.use("/api", category);
app.use("/api", project);
app.use("/api", skill);
app.use("/api", contact);

module.exports = app;
