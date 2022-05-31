require('dotenv').config();
const router = require("express").Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Review } = require("../models/user");
const authenticate = require('../middlewares/authenticate')

const config = process.env;

router.post('/', authenticate, async(req, res) => {
    console.log(req.body);
    const review = new Review({
        userId: res.locals.userId,
        movieId: req.body.movieId,
        rating: req.body.rating,
        comment: req.body.comment,
    });

    review.save(res.sendStatus(200)).catch(console.error);
});

module.exports = router;