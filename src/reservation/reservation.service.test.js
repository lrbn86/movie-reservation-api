import { describe, it } from 'node:test';
import assert from 'node:assert';
import reservationRepository from './reservation.repository.js';
import reservationService from './reservation.service.js';

describe('Reservation Service Test', () => {
  it('should create a reservation if valid showtime and available seats', async (t) => {
    t.mock.method(reservationRepository, 'findShowtime', async () => true);
    t.mock.method(reservationRepository, 'findSeats', async () => true);
    const reservationRequest = {
      userId: 'userId',
      movieId: 'movieId',
      showtime: 'showtimeId',
      seats: ['A16', 'A17'],
    };
    const reservation = await reservationService.createReservation(reservationRequest);
    const expected = { status: 'reserved', ...reservationRequest };

    assert.deepEqual(reservation, expected);
  });

  it('should not create a reservation if valid showtime but unavailable seats', async (t) => {
    t.mock.method(reservationRepository, 'findShowtime', async () => true);
    t.mock.method(reservationRepository, 'findSeats', async () => false);
    const reservationRequest = {
      userId: 'userId',
      movieId: 'movieId',
      showtime: 'showtimeId',
      seats: ['A16', 'A17'],
    };

    await assert.rejects(async () => {
      return await reservationService.createReservation(reservationRequest);
    }, Error('Reservation could not be made due to no availability'));
  });

  it('should not create a reservation if invalid showtime', async (t) => {
    t.mock.method(reservationRepository, 'findShowtime', async () => false);
    const reservationRequest = {
      userId: 'userId',
      movieId: 'movieId',
      showtime: 'showtimeId',
      seats: ['A16', 'A17'],
    };

    await assert.rejects(async () => {
      return await reservationService.createReservation(reservationRequest);
    }, Error('Invalid showtime'));
  });

  it('should throw an error on invalid inputs', async (t) => {
    const error = new Error('Invalid reservation request');

    await assert.rejects(async () => {
      return await reservationService.createReservation();
    }, error, 'no fields should be provided');

    await assert.rejects(async () => {
      return await reservationService.createReservation({
        userId: 'userId',
        movieId: 'movieId',
        showtimeId: 'showtimeId',
      });
    }, error, 'seats should not be provided');

    await assert.rejects(async () => {
      return await reservationService.createReservation({
        userId: 'userId',
        movieId: 'movieId',
        seats: ['A16'],
      });
    }, error, 'showtimeId should not be provided');

    await assert.rejects(async () => {
      return await reservationService.createReservation({
        userId: 'userId',
        showtimeId: 'showtimeId',
        seats: ['A16'],
      });
    }, error, 'movieId should not be provided');

    await assert.rejects(async () => {
      return await reservationService.createReservation({
        movieId: 'movieId',
        showtimeId: 'showtimeId',
        seats: ['A16'],
      });
    }, error, 'userId should not be provided');
  });
});
