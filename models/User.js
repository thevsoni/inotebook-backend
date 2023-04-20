const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// module.exports = mongoose.model('user', UserSchema);

const User = mongoose.model('user', UserSchema); //isse user name se collection banega in my db ,but doubt bcs users name se bana db me

// User.createIndexes();

module.exports = User;