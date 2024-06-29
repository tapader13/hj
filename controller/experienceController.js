import asyncHandler from 'express-async-handler';
import Experience from '../models/experienceModel.js';
//@ post
//@ experience/createexp
//@ private
const createExperience = asyncHandler(async (req, res) => {
  const { value, label, checked } = req.body;
  const expExists = await Experience.findOne({ value });
  if (expExists) {
    res.status(400);
    throw new Error('experience exist');
  }
  const experience = await Experience.create({ value, label, checked });
  if (experience) {
    res.status(201).json({
      message: 'experience created',
    });
  } else {
    res.status(400);
    throw new Error('experience data not store');
  }
});
//@ get
//@ experience/getexp
//@ public
const getExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.find({});
  res.status(200).json(experience);
});
export { createExperience, getExperience };
