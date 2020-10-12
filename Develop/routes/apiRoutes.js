const router = require('express').Router();
const notesClass = require('../db/notesClass');

router.get("/notes", (req, res) => { 
    notesClass.getNotes().then(notes => res.json(notes)).catch(err => res.json(err))
});

router.post("/notes", (req, res) => {
    notesClass.addNotes(req.body).then(notes => res.json(notes)).catch(err => res.json(err))
});

router.delete("/notes/:id", (req, res) => {
    notesClass.deleteNotes(req.params.id).then(() => res.json({ok:true})).catch(err => res.json(err))
});

module.exports = router;