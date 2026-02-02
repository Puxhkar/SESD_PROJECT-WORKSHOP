import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import { Prisma, User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export class AuthService {
    async register(data: Prisma.UserCreateInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return userRepository.create({
            ...data,
            password: hashedPassword,
        });
    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: '24h',
        });

        return { user, token };
    }
}

export const authService = new AuthService();
