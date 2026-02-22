import express from 'express';
import {
  createRequest,
  getAllRequests,
  getMyRequests,
  approveRequest,
  rejectRequest,
  returnAsset
} from '../controllers/requestController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createRequest)
  .get(protect, admin, getAllRequests);

router.get('/my-requests', protect, getMyRequests);
router.put('/:id/approve', protect, admin, approveRequest);
router.put('/:id/reject', protect, admin, rejectRequest);
router.put('/:id/return', protect, returnAsset);

export default router;
