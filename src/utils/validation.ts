import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().optional(),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        description: z.string().optional(),
        price: z.number().positive(),
        category: z.string(),
        stock: z.number().int().nonnegative().optional(),
    }),
});

export const updateProductSchema = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
        description: z.string().optional(),
        price: z.number().positive().optional(),
        category: z.string().optional(),
        stock: z.number().int().nonnegative().optional(),
    }),
});
