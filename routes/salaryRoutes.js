import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createSalary, getSalary } from '../controller/salaryController.js';

const router = express.Router();
router.post('/createsalary', protect, createSalary);
router.get('/getsalary', getSalary);
export default router;
