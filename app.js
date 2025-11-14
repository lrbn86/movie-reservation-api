import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRouter from './src/auth/auth.router.js';
import movieRouter from './src/movie/movie.router.js';
import reservationRouter from './src/reservation/reservation.router.js';

const app = express();

app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.use('/api/auth', authRouter);
app.use('/api/movies', movieRouter);
app.use('/api/reservations', reservationRouter);

export default app;
