import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createExperience,
  getExperience,
} from '../controller/experienceController.js';

const router = express.Router();
router.post('/createexp', protect, createExperience);
router.get('/getexp', getExperience);
export default router;
