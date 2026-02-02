import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return next(new AppError('No token provided', 401));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: string;
            role: string;
        };
        req.user = decoded;
        next();
    } catch (error) {
        next(new AppError('Invalid or expired token', 401));
    }
};
