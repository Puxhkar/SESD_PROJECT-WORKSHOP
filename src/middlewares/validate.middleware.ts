import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject } from 'zod';
import { AppError } from './error.middleware';

export const validate = (schema: ZodObject<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map((issue) => ({
                    path: issue.path.join('.'),
                    message: issue.message,
                }));
                const appError = new AppError('Validation failed', 400);
                (appError as any).errors = errors;
                return next(appError);
            }
            next(error);
        }
    };
};
