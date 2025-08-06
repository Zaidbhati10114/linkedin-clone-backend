import express from 'express';
import { body } from 'express-validator';
import { createPost, getAllPosts, getUserPosts } from '../controllers/postController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, [
    body('content').trim().isLength({ min: 1, max: 1000 }).withMessage('Content must be between 1 and 1000 characters'),
], createPost);

router.get('/', getAllPosts);
router.get('/user/:userId', getUserPosts);

export default router;