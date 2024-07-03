const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://personal:ghanshyam@personal.rk2pkro.mongodb.net/megascale"
  )
  .then(() => {
    console.log("DB Connected");
  });

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
});

const User = mongoose.model("User", userSchema);

app.use("/", (req, res) => {
  res.send("Hello World! Hello HELLO Hello");
});

app.post("/user", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      mobile: req.body.mobile,
    });
    await user.save();
    res
      .status(200)
      .send({ data: user, message: "User created successfully", result: true });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ err, message: "Internal Server Error", result: false });
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({
      data: users,
      message: "Users fetched successfully",
      result: true,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ err, message: "Internal Server Error", result: false });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "192.168.100.100", () =>
  console.log(`Server running on port ${PORT}`)
);
