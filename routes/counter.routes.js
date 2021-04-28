/* eslint-disable no-console */
const { Router } = require('express');
const Mongoose = require('mongoose');
const Counter = require('../models/Counter');

const { ObjectId } = Mongoose.Types;

const router = Router();

// /counter/counter
router.get('/counter', async (req, res) => {
  try {
    const counters = await Counter.find();
    if (counters.length === 0) {
      const counter = new Counter({ sessionID: 1, count: 0 });
      await counter.save();
      res.json(counter);
    } else {
      const lastcounter = await Counter.find().sort({ $natural: -1 }).limit(1);
      const sId = lastcounter[0].sessionID + 1;
      const counter = new Counter({ sessionID: sId, count: 0 });
      await counter.save();
      res.json(counter);
    }
  } catch (e) {
    res.status(500).json({ message: 'Something wrong' });
  }
});

// /counter/changecounter
router.post('/changecounter', async (req, res) => {
  try {
    const { count, ID } = req.body;
    await Counter.findOneAndUpdate({ _id: ObjectId(ID) }, { count });
    const counter = Counter.find({ _id: ObjectId(ID) });
    res.json(counter);
  } catch (e) {
    res.status(500).json({ message: 'Something wrong' });
  }
});

module.exports = router;
