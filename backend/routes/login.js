const router = require("express").Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

let User = require("../models/user");

router.route("/login").post(async (req, res) => {
  try {
    let response = await axios.post("https://oauth2.googleapis.com/token", {
      code: req.body.code,
      client_id:
        "817290401795-d6ds6ronnut9djcamv7mu1dakheeefr3.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri: "http://localhost:3000/callback",
      grant_type: "authorization_code",
    });

    // console.log("response", response.data.id_token);
    // res.status(200).json(response.data);

    const decoded = jwt.decode(response.data.id_token);

    const myToken = jwt.sign(
      { id: decoded.sub, email: decoded.email },
      process.env.MY_SECRET_KEY
    );
    res.json(myToken);

    let user = await User.findOne({
      email: decoded.email,
      password: decoded.sub,
    });

    //   console.log("email:", decoded.email, user);
    if (!user) {
      console.log("más");
      //   User.create({
      //     email: decoded.email,
      //     password: decoded.sub,
      //     isConfirmed: decoded.email_verified,
      //   });
      let newUser = new User({
        id: decoded.at_hash,
        email: decoded.email,
        password: decoded.sub,
        isConfirmed: decoded.email_verified,
      });
      //   newUser.save();

      newUser.save(function (err, user) {
        if (err) return console.error(err);
        console.log(user.name + " saved to  collection.");
      });
    } else {
      console.log("azonos");
    }
  } catch (error) {
    console.log("Error catch: ", error);
  }
});

module.exports = router;
