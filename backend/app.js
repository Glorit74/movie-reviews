const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL,
    //   optionsSuccessStatus: 200,
  })
);
app.use(express.json());

const login = require("./routes/login");
app.use("/api/login", login);

module.exports = app;
