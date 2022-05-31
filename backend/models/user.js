const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
});


const User = mongoose.model("User", userSchema);
/*
const example1 = new User({ googleId: '1234', email: 'test@gmail.com' });
example1.save();
*/

module.exports = User;