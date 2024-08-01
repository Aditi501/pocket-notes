const express = require('express');
const router = express.Router();
const Note = require('../models/notes');


router.post('/add/:groupId', async (req, res) => {
  const {  body } = req.body;
  const {groupId}=req.params
  try {
    const newNote = new Note({
      body, createdGroup : groupId
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:groupId', async (req, res) => {
  const { groupId } = req.params;
  try {
    const notes = await Note.find({createdGroup: groupId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
