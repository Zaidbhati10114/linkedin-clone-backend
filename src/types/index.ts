export interface User {
    id: string;
    name: string;
    email: string;
    bio?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

export interface Post {
    _id: string;
    content: string;
    author: User;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    bio?: string;
}