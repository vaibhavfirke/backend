const express = require("express");
const { connection } = require("./confing/db");
const { authenticate } = require("./middleware/auth.middleware");
const { socialRouter } = require("./routes/social.routes");
const { userRouter } = require("./routes/user.routes");
const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use(authenticate)
app.use("/posts", socialRouter);
require("dotenv").config();

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("database connected");
  } catch (err) {
    console.log("somthing went wrong");
    console.log(err);
  }
  console.log(`server is running on port ${process.env.port}`);
});
