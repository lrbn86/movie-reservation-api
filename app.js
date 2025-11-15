import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import authRouter from './src/auth/auth.router.js';
import movieRouter from './src/movie/movie.router.js';
import reservationRouter from './src/reservation/reservation.router.js';
import authenticate from './src/middleware/authenticate.js';

const NODE_ENV = process.env.NODE_ENV;

const app = express();

app.use(express.json());
app.use(helmet());

if (NODE_ENV === 'production' || NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

if (NODE_ENV === 'production') {
  app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 3,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  }));
  app.use(authenticate);
}

app.get('/health', (req, res) => {
  return res.send('OK');
});

app.use('/api/auth', authRouter);
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
