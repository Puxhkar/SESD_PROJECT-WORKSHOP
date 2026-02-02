import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Product Management API',
        api_prefix: '/api',
        endpoints: {
            health: '/health',
            auth: '/api/auth',
            products: '/api/products'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorMiddleware as any);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
