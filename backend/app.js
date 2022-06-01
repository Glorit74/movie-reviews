const express = require("express");
const cors = require("cors");
const loginRoutes = require('./routes/login');
const reviewRoutes = require('./routes/review');

const app = express();

app.use(
    cors({
        origin: process.env.APP_URL,
        //   optionsSuccessStatus: 200,
    })
);
app.use(express.json());

app.use("/api/login", loginRoutes);
app.use("/api/reviews", reviewRoutes);

module.exports = app;