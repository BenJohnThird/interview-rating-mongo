import express, { NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import workExperienceRoutes from './routes/workexperience.routes';
import authRoutes from './routes/auth.routes';
import cookieParser from 'cookie-parser';
import { APP_ORIGIN } from './constants/env';
import errorHandler from './middleware/error-handler';
import quoteRoute from './routes/quote.route';
import authenticate from './middleware/authenticate';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true
    })
);

app.use(cookieParser());

app.use('/api/workexperience', workExperienceRoutes);
app.use('/api/identity', authRoutes);
app.use('/api/quotes', authenticate, quoteRoute);
app.get('/', (req, res, next) => {
    res.status(200).json({ status: 'Healthy ' });
});

// error handler
app.use(errorHandler);

export default app;
