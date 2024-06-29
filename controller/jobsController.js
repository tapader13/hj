import asyncHandler from 'express-async-handler';
import Job from '../models/jobModel.js';
//@ post
//@ job/createjob
//@ private
const createJob = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const {
    title,
    description,
    company,
    location,
    salary_from,
    salary_to,
    employment_type,
    application_deadline,
    Workexperience,
    contact,
    job_category,
    is_remote_work,
    number_of_opening,
    created_at,
    updated_at,
  } = req.body;
  const newJob = await Job.create({
    title,
    description,
    company,
    location,
    salary_from,
    salary_to,
    employment_type,
    application_deadline,
    Workexperience,
    contact,
    job_category,
    is_remote_work,
    number_of_opening,
    created_at,
    updated_at,
    userid: id,
  });
  if (newJob) {
    res.status(201).json({
      message: 'job created',
    });
  } else {
    res.status(400);
    throw new Error('job data not store');
  }
});
//@ get
//@ job/getuserjob
//@ private
const getJobByUserId = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({ userid: req.user.id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400);
    throw new Error('jobs data not found');
  }
});
//@ get
//@ job/getjobdlts:id
//@ public
const getJobDetails = asyncHandler(async (req, res) => {
  try {
    const jobdlts = await Job.find({ _id: req.params.id });
    res.status(200).json(jobdlts);
  } catch (error) {
    res.status(400);
    throw new Error('jobs details not found');
  }
});

//@ get
//@ job
//@ public
const fetchJobs = asyncHandler(async (req, res) => {
  let qry = Job.find({});
  let qryDemo = Job.find({});
  if (req.query.title) {
    const titleRegex = new RegExp(req.query.title, 'i');
    qry = qry.find({ title: titleRegex });
    qryDemo = qryDemo.find({ title: titleRegex });
  }
  if (req.query.employment_type && req.query.employment_type !== 'All Jobs') {
    qry = qry.find({ employment_type: req.query.employment_type });
    qryDemo = qryDemo.find({ employment_type: req.query.employment_type });
  }
  if (req.query.location && req.query.location !== 'Any Where') {
    qry = qry.find({ location: req.query.location });
    qryDemo = qryDemo.find({ location: req.query.location });
  }
  if (req.query.salary_from) {
    qry = qry.find({ salary_from: { $lte: req.query.salary_from } });
    qryDemo = qryDemo.find({ salary_from: { $lte: req.query.salary_from } });
  }
  if (
    req.query.Workexperience &&
    req.query.Workexperience !== 'Any experience'
  ) {
    qry = qry.find({ Workexperience: req.query.Workexperience });
    qryDemo = qryDemo.find({
      Workexperience: req.query.Workexperience,
    });
  }

  // Count operation before pagination modification
  let tot = await qryDemo.countDocuments().exec();
  console.log(tot, 'tot in jobs');

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    qry = qry.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    res.set('total', tot);
    const response = await qry.exec();
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json(error);
  }
});

export { createJob, getJobByUserId, getJobDetails, fetchJobs };
