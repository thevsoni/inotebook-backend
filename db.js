const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


async function main() {
    console.log(process.env.mongoURI);
    await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    //here we are connecting with my own server so not need safety parameter

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    //then here need to pass also safety parameter
    //when we use atlas url

}

module.exports = main;
