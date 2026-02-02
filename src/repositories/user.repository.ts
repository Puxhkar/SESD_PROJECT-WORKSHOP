import { User, Prisma } from '@prisma/client';
import prisma from '../config/database';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<
    User,
    Prisma.UserCreateInput,
    Prisma.UserUpdateInput
> {
    protected model = prisma.user;

    async findByEmail(email: string): Promise<User | null> {
        return this.model.findUnique({ where: { email } });
    }
}

export const userRepository = new UserRepository();
