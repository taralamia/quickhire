import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import route from "./routes/route";
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*' }));
app.use(express.json());

// API routes
app.use('/api', route);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Global error handler — must be last
app.use(errorHandler);

export default app;