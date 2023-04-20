const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middlewear/fetchuser');
const { route } = require('./auth');


//route 1 : add a note using : post "/api/notes/addnote" , login required
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 chars').isLength({ min: 5 })

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }
        const note = new Note({ title, tag, description, user: req.user.id })
        const savedNote = await note.save();
        res.json(savedNote);
        console.log("your notes added successfully")
    } catch (err) {
        console.log("some error");
        console.error(error.message);
        res.status(500).send("internal server error, so note has not added");
    }
});

//route 2: fetch all the note using : GET "/api/notes/fetchallnotes" , login required
router.get('/fetchallnotes', fetchuser,
    async (req, res) => {
        try {
            const notes = await Note.find({ user: req.user.id });
            // const notes = await Note.find({ user: req.user.id }).select("-date -user -_id");
            console.log("your notes fetched successfully")
            res.json(notes);
        } catch (err) {
            console.log("some error");
            console.error(error.message);
            res.status(500).send("internal server error, so notes has not fetched");
        }
    })


//route 3: update an existing note using : PUT "/api/notes/updatenote" ,login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    //create a new object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("not found") }

    //recheck for extra security .may be logged in user is trying to update another person notes
    if (note.user.toString() != req.user.id) { return res.status(401).send("not allowed") }

    //else if everything is ok
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    console.log("updated note successfully")
    res.json({ note });
})

//route 4 : delete an existing note using : DELETE "/api/notes/deletenote" ,login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {


        //find the note to be delete and delete it
        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send("not found") }

        //allow deletion only if user owns this note
        if (note.user.toString() != req.user.id) { return res.status(401).send("not allowed") }

        //else
        note = await Note.findByIdAndDelete(req.params.id);
        console.log("your notes has been deleted successfully")
        res.json({ "success": "note has been deleted successfully", note: note })
    } catch (error) {
        console.log("some error occured ,so note has been not deleted", error.message)
        res.status(500).send("interval server error")
    }
})

module.exports = router;
