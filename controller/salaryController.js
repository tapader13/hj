import asyncHandler from 'express-async-handler';
import Salary from '../models/salaryModel.js';
//@ post
//@ salary/createsalary
//@ private
const createSalary = asyncHandler(async (req, res) => {
  const { value, label, checked } = req.body;
  const salaryExists = await Salary.findOne({ value });
  if (salaryExists) {
    res.status(400);
    throw new Error('salary exist');
  }
  const salary = await Salary.create({ value, label, checked });
  if (salary) {
    res.status(201).json({
      message: 'salary created',
    });
  } else {
    res.status(400);
    throw new Error('salary data not store');
  }
});
//@ get
//@ salary/getsalary
//@ public
const getSalary = asyncHandler(async (req, res) => {
  const salary = await Salary.find({});
  res.status(200).json(salary);
});
export { createSalary, getSalary };
