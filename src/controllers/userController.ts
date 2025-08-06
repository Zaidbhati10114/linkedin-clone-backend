import { Request } from 'express';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

export interface RegisterBody {
    name: string;
    email: string;
    password: string;
    bio?: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface PostBody {
    content: string;
}


import { Response } from 'express';
import User from '../models/User';


export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};