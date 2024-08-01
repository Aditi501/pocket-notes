const express = require('express');
const router = express.Router();
const Group = require('../models/Group');


router.post('/', async (req, res) => {
  const { name, color } = req.body;
  try {
    const newGroup = new Group({ name, color });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
