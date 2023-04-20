const mongoose = require('mongoose');
const { Schema } = mongoose;


const NotesSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, default: "general" },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('notes', NotesSchema);//isse notes name se collection banega in my db
//but doubt ,agar note kar raha fir bhi notes se bn raha hai aise user kr raha to users se bn raha hai