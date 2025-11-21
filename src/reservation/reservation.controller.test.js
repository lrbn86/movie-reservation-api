import request from 'supertest';
import { describe, it, before, mock } from 'node:test';
import assert from 'node:assert';
import reservationRepository from './reservation.repository.js';
import app from '../../app.js';

describe('Reservation Controller Test', () => {
  before(() => {
    mock.method(reservationRepository, 'findShowtime', async () => true);
    mock.method(reservationRepository, 'findSeats', async () => true);
  });

  it('should create a reservation with valid inputs and return 201', async (t) => {
    const reservationRequest = {
      userId: 'userId',
      movieId: 'movieId',
      showtimeId: 'showtimeId',
      seats: ['A16'],
    };
    const expected = { status: 'reserved', ...reservationRequest };
    const res = await request(app)
      .post('/api/reservations')
      .send(reservationRequest);

    assert.equal(res.statusCode, 201);
    assert.deepEqual(res.body, expected);
  });

  it('should return 400 if missing movieId', async () => {
    const reservationRequest = {
      userId: 'userId',
      showtimeId: 'showtimeId',
      seats: ['A16'],
    };
    const res = await request(app)
      .post('/api/reservations')
      .send(reservationRequest);

    assert.equal(res.statusCode, 400);
    assert.deepEqual(res.body, { error: 'Missing required fields: userId, movieId, showtimeId, seats' });
  });

  it('should return 400 if missing showtimeId', async () => {
    const reservationRequest = {
      userId: 'userId',
      movieId: 'movieId',
      seats: ['A16'],
    };
    const res = await request(app)
      .post('/api/reservations')
      .send(reservationRequest);

    assert.equal(res.statusCode, 400);
    assert.deepEqual(res.body, { error: 'Missing required fields: userId, movieId, showtimeId, seats' });
  });

  it('should return 400 if missing seats', async () => {
    const reservationRequest = {
      userId: 'userId',
      movieId: 'movieId',
      showtimeId: 'showtimeId',
    };
    const res = await request(app)
      .post('/api/reservations')
      .send(reservationRequest);

    assert.equal(res.statusCode, 400);
    assert.deepEqual(res.body, { error: 'Missing required fields: userId, movieId, showtimeId, seats' });
  });
});
