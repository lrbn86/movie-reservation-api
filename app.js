import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRouter from './src/auth/auth.router.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

app.use('/api/auth', authRouter);

export default app;
