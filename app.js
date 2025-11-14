import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import authRouter from './src/auth/auth.router.js';
import movieRouter from './src/movie/movie.router.js';
import reservationRouter from './src/reservation/reservation.router.js';
import authenticate from './src/middleware/authenticate.js';

const app = express();

app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
  app.use(rateLimit());
}

app.get('/health', (req, res) => {
  return res.send('OK');
});

app.use('/api/auth', authRouter);

app.use(authenticate);
app.use('/api/movies', movieRouter);
app.use('/api/reservations', reservationRouter);

app.use((req, res, next) => {
  return res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.sendStatus(500);
});

export default app;
