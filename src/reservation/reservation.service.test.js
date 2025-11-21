import { describe, it } from 'node:test';
import assert from 'node:assert';
import reservationRepository from './reservation.repository.js';
import reservationService from './reservation.service.js';

describe('Reservation Service Test', () => {
  describe('reservationService.createReservation', () => {
    it('should create and return a reservation with valid inputs and it is available', async (t) => {
      const reservationRequest = {
        userId: 'userId',
        movieId: 'movieId',
        showtime: new Date('11-20-2025'),
        seats: ['A16', 'A17'],
      };
      t.mock.method(reservationRepository, 'create', async () => ({ status: 'active', ...reservationRequest }));
      t.mock.method(reservationRepository, 'findShowtime', async () => true);
      t.mock.method(reservationRepository, 'findSeats', async () => true);
      const reservation = await reservationService.createReservation(reservationRequest);

      assert.deepEqual(reservation, { status: 'active', ...reservationRequest });
    });

    it('should throw an error when creating a reservation with invalid inputs', async (t) => {
      const reservationRequest = {
        userId: 'userId',
        showtime: new Date('11-20-2025'),
        seats: ['A16', 'A17'],
      };
      t.mock.method(reservationRepository, 'create', async () => ({ status: 'active', ...reservationRequest }));
      t.mock.method(reservationRepository, 'findShowtime', async () => true);
      t.mock.method(reservationRepository, 'findSeats', async () => true);

      await assert.rejects(async () => await reservationService.createReservation(reservationRequest), Error('Invalid reservation request'));
    });

    it('should throw an error when creating a reservation with no availability', async (t) => {
      const reservationRequest = {
        userId: 'userId',
        movieId: 'movieId',
        showtime: new Date('11-20-2025'),
        seats: ['A16', 'A17'],
      };
      t.mock.method(reservationRepository, 'create', async () => ({ status: 'active', ...reservationRequest }));

      t.mock.method(reservationRepository, 'findShowtime', async () => true);
      t.mock.method(reservationRepository, 'findSeats', async () => false);
      await assert.rejects(async () => await reservationService.createReservation(reservationRequest), Error('Reservation could not be made due to no availability'));

      t.mock.method(reservationRepository, 'findShowtime', async () => false);
      t.mock.method(reservationRepository, 'findSeats', async () => true);
      await assert.rejects(async () => await reservationService.createReservation(reservationRequest), Error('Reservation could not be made due to no availability'));

      t.mock.method(reservationRepository, 'findShowtime', async () => false);
      t.mock.method(reservationRepository, 'findSeats', async () => false);
      await assert.rejects(async () => await reservationService.createReservation(reservationRequest), Error('Reservation could not be made due to no availability'));
    });
  });
});
