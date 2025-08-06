import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getCurrentUser, getUserProfile } from '../controllers/userController';

const router = express.Router();

router.get('/me', authenticateToken, getCurrentUser);
router.get('/:userId', getUserProfile);

export default router;