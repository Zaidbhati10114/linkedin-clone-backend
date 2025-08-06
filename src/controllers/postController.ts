import { Response } from 'express';
import { validationResult } from 'express-validator';
import Post from '../models/Post';
import { AuthRequest, PostBody } from './userController';


export const createPost = async (req: AuthRequest, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { content }: PostBody = req.body;
        const userId = req.user?.id;

        const post = new Post({
            content,
            author: userId,
        });

        await post.save();
        await post.populate('author', 'name email');

        res.status(201).json({
            message: 'Post created successfully',
            post,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllPosts = async (req: AuthRequest, res: Response) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        res.json({ posts });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getUserPosts = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;

        const posts = await Post.find({ author: userId })
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        res.json({ posts });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};