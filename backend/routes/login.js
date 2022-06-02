require("dotenv").config();
const router = require("express").Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User } = require("../models/user");

const config = process.env;

router.post("/", async (req, res) => {
  //console.log(req.body);

  try {
    let response = await axios.post("https://oauth2.googleapis.com/token", {
      code: req.body.code,
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      redirect_uri: config.REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const decoded = jwt.decode(response.data.id_token);
    console.log("decoded:", decoded);

    let user = await User.findOne({
      googleId: decoded.sub,
    });
    let id;
    let name;

    if (!user) {
      //console.log("új user lép éppen be");
      let newUser = await User.create({
        googleId: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
        locale: decoded.locale,
        picture: decoded.picture,
      });

      newUser.save();

      id = newUser._id;
      name = newUser.name;
    } else {
      id = user._id;
      name = user.name;
    }

    const myToken = jwt.sign({ id: id, name: name }, process.env.MY_SECRET_KEY);
    res.json(myToken);
  } catch (error) {
    console.log("Error catch: ", error);
    res.sendStatus(500);
  }
});

module.exports = router;
