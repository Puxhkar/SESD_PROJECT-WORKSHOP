import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { productController } from '../controllers/product.controller';
import { auth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
    registerSchema,
    loginSchema,
    createProductSchema,
    updateProductSchema,
} from '../utils/validation';

const router = Router();

// Auth routes
router.post('/auth/register', validate(registerSchema), authController.register);
router.post('/auth/login', validate(loginSchema), authController.login);

// Product routes
router.post('/products', auth, validate(createProductSchema), productController.create);
router.get('/products', productController.getAll);
router.get('/products/:id', productController.getById);
router.put('/products/:id', auth, validate(updateProductSchema), productController.update);
router.delete('/products/:id', auth, productController.delete);

export default router;
