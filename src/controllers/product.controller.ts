import { NextFunction, Response } from 'express';
import { productService } from '../services/product.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { AppError } from '../middlewares/error.middleware';

export class ProductController {
    async create(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const product = await productService.createProduct({
                ...req.body,
                user: { connect: { id: req.user!.userId } },
            });
            res.status(201).json({ status: 'success', data: product });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { page, limit, search, category, sortBy, sortOrder, minPrice, maxPrice } = req.query;
            const result = await productService.getAllProducts({
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
                search: search as string,
                category: category as string,
                sortBy: sortBy as string,
                sortOrder: sortOrder as 'asc' | 'desc',
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
            });
            res.json({ status: 'success', ...result });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id as string);
            if (!product) {
                throw new AppError('Product not found', 404);
            }
            res.json({ status: 'success', data: product });
        } catch (error) {
            next(error);
        }
    }

    async update(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id as string);
            if (!product) {
                throw new AppError('Product not found', 404);
            }
            if (product.userId !== req.user!.userId) {
                throw new AppError('Unauthorized to update this product', 403);
            }
            const updatedProduct = await productService.updateProduct(id as string, req.body);
            res.json({ status: 'success', data: updatedProduct });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id as string);
            if (!product) {
                throw new AppError('Product not found', 404);
            }
            if (product.userId !== req.user!.userId) {
                throw new AppError('Unauthorized to delete this product', 403);
            }
            await productService.deleteProduct(id as string);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export const productController = new ProductController();
