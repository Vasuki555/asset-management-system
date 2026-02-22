import express from 'express';
import {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
  getDashboardStats
} from '../controllers/assetController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getAssets)
  .post(protect, admin, createAsset);

router.get('/stats/dashboard', protect, admin, getDashboardStats);

router.route('/:id')
  .get(protect, getAssetById)
  .put(protect, admin, updateAsset)
  .delete(protect, admin, deleteAsset);

export default router;
