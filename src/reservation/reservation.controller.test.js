import request from 'supertest';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import reservationService from './reservation.service.js';
import app from '../../app.js';

describe('Reservation Controller Test', () => {
  describe('reservationController.createReservation', () => {
    it('should create a reservation with valid inputs and return 201', async (t) => {
      const mockData = { title: 'Title', seats: 2, date: new Date('11-19-2025').toISOString() };
      t.mock.method(reservationService, 'createReservation', async () => mockData);
      const res = await request(app)
        .post('/api/reservations')
        .send(mockData);

      assert.equal(res.statusCode, 201);
      assert.deepEqual(res.body, mockData);
    });

    it('should return 400 if title is missing', async (t) => {
      t.mock.method(reservationService, 'createReservation', async () => { });
      const mockData = { seats: 2, date: new Date('11-19-2025').toISOString() };
      const res = await request(app)
        .post('/api/reservations')
        .send(mockData);

      assert.equal(res.statusCode, 400);
      assert.deepEqual(res.body, { error: 'Missing title' });
    });

    it('should return 400 if seats is missing', async (t) => {
      t.mock.method(reservationService, 'createReservation', async () => { });
      const mockData = { title: 'Title', date: new Date('11-19-2025').toISOString() };
      const res = await request(app)
        .post('/api/reservations')
        .send(mockData);

      assert.equal(res.statusCode, 400);
      assert.deepEqual(res.body, { error: 'Missing seats' });
    });

    it('should return 400 if date is missing', async (t) => {
      t.mock.method(reservationService, 'createReservation', async () => { });
      const mockData = { title: 'Title', seats: 2 };
      const res = await request(app)
        .post('/api/reservations')
        .send(mockData);

      assert.equal(res.statusCode, 400);
      assert.deepEqual(res.body, { error: 'Missing date' });
    });
  });
});
