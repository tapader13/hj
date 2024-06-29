import express from 'express';
import {
  createLocation,
  getLocation,
} from '../controller/locationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/createloc', protect, createLocation);
router.get('/getloc', getLocation);
export default router;
