import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createCategorie,
  getCategorie,
} from '../controller/categorieController.js';

const router = express.Router();
router.post('/createcat', protect, createCategorie);
router.get('/getcat', getCategorie);
export default router;
