const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true }, //sub
  email: { type: String, required: true, unique: true },
  name: String,
  nickname: String,
  given_name: String,
  family_name: String,
  locale: String,
  picture: String,
  //   {
  //     data: Buffer,
  //     contentType: String,
  //   },
});

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  movieId: { type: String, required: true },
  rating: { type: Number },
  comment: { type: String },
});

const User = mongoose.model("User", userSchema);
const Review = mongoose.model("Review", reviewSchema);
/*
const example1 = new User({ googleId: '1234', email: 'test@gmail.com' });
example1.save();
*/

module.exports = { User, Review };
