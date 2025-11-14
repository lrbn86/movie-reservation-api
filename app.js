import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRouter from './src/auth/auth.router.js';
import movieRouter from './src/movie/movie.router.js';

const app = express();

app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.use('/api/auth', authRouter);
app.use('/api/movies', movieRouter);

export default app;
