import { productRepository } from '../repositories/product.repository';
import { Prisma, Product } from '@prisma/client';

export class ProductService {
    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        return productRepository.create(data);
    }

    async getProductById(id: string): Promise<Product | null> {
        return productRepository.findById(id);
    }

    async updateProduct(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
        return productRepository.update(id, data);
    }

    async deleteProduct(id: string): Promise<Product> {
        return productRepository.delete(id);
    }

    async getAllProducts(params: {
        page?: number;
        limit?: number;
        search?: string;
        category?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
        minPrice?: number;
        maxPrice?: number;
    }) {
        const {
            page = 1,
            limit = 10,
            search,
            category,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            minPrice,
            maxPrice,
        } = params;

        const skip = (page - 1) * limit;

        const where: Prisma.ProductWhereInput = {};

        if (search) {
            where.OR = [
                { name: { contains: search } },
                { description: { contains: search } },
            ];
        }

        if (category) {
            where.category = category;
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined) where.price.gte = minPrice;
            if (maxPrice !== undefined) where.price.lte = maxPrice;
        }

        const [products, total] = await Promise.all([
            productRepository.findWithFilters({
                skip,
                take: limit,
                where,
                orderBy: { [sortBy]: sortOrder },
            }),
            productRepository.count(where),
        ]);

        return {
            data: products,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}

export const productService = new ProductService();
