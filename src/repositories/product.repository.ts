import { Product, Prisma } from '@prisma/client';
import prisma from '../config/database';
import { BaseRepository } from './base.repository';

export class ProductRepository extends BaseRepository<
    Product,
    Prisma.ProductCreateInput,
    Prisma.ProductUpdateInput
> {
    protected model = prisma.product;

    async findWithFilters(params: {
        skip?: number;
        take?: number;
        where?: Prisma.ProductWhereInput;
        orderBy?: Prisma.ProductOrderByWithRelationInput;
    }): Promise<Product[]> {
        return this.model.findMany(params);
    }
}

export const productRepository = new ProductRepository();
