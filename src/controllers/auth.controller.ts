import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.register(req.body);
            const { password, ...userWithoutPassword } = user;
            res.status(201).json({ status: 'success', data: userWithoutPassword });
        } catch (error: any) {
            if (error.code === 'P2002') {
                error.message = 'Email already exists';
                error.statusCode = 400;
            }
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            const { password: _, ...userWithoutPassword } = result.user;
            res.json({
                status: 'success',
                data: {
                    user: userWithoutPassword,
                    token: result.token,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();
