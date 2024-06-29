import asyncHandler from 'express-async-handler';
import Location from '../models/locationModel.js';
//@ post
//@ location/createloc
//@ private
const createLocation = asyncHandler(async (req, res) => {
  const { value, label, checked } = req.body;
  const locExists = await Location.findOne({ value });
  if (locExists) {
    res.status(400);
    throw new Error('location exist');
  }
  const location = await Location.create({ value, label, checked });
  if (location) {
    res.status(201).json({
      message: 'location created',
    });
  } else {
    res.status(400);
    throw new Error('lcation data not store');
  }
});
//@ get
//@ location/getloc
//@ public
const getLocation = asyncHandler(async (req, res) => {
  const loc = await Location.find({});
  res.status(200).json(loc);
});
export { createLocation, getLocation };
