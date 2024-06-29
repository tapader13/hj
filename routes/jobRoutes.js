import express from 'express';
import {
  createJob,
  fetchJobs,
  getJobByUserId,
  getJobDetails,
} from '../controller/jobsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/createjob', protect, createJob);
router.get('/getuserjob', protect, getJobByUserId);
router.get('/getjobdlts/:id', getJobDetails);
router.get('/', fetchJobs);
export default router;
