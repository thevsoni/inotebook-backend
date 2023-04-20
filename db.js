const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://thevsoni:Vishal2828@cluster0.h75ole2.mongodb.net/iNoteBook?retryWrites=true&w=majority';

async function main() {
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
