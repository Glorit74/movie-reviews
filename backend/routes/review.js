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

router.get("/", async(req, res) => {
    // all reviews

    const reviews = await Review.find()
        .populate("userId")
        //console.log(inst);
    if (!reviews) return res.json(null);

    res.json(reviews);
});

router.get("/:movieId", async(req, res) => {
    //all review for a given movie

    const reviews = await Review.find({ movieId: req.params.movieId })
        .populate('userId')
    if (!reviews) return res.json(null);

    res.json(reviews);
});

router.get("/myreviews", authenticate, async(req, res) => {
    // all review for logged in user

    const reviews = await Review.find({ userId: res.locals.userId })

    if (!reviews) return res.json(null);

    res.json(reviews);
});

router.get("/myreviews/:movieId", authenticate, async(req, res) => {
    // all review for a given movie for a logged in user

    const reviews = await Review.find({ movieId: req.params.movieId, userId: res.locals.userId })
    console.log(req.params.movieId);
    console.log(res.locals.userId);

    if (!reviews) return res.json(null);

    res.json(reviews);
});

module.exports = router;