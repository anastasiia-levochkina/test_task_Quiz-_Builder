import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import quizzesRouter from './routes/quizzes';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  }),
);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use('/', quizzesRouter);

export default app;
