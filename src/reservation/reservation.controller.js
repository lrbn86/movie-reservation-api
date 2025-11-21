import reservationService from './reservation.service.js';

async function createReservation(req, res) {
  const userId = req?.body?.userId;
  const movieId = req?.body?.movieId;
  const showtimeId = req?.body?.showtimeId;
  const seats = req?.body?.seats;

  if (!userId || !movieId || !showtimeId || !seats) {
    return res.status(400).json({ error: 'Missing required fields: userId, movieId, showtimeId, seats' });
  }

  const reservationRequest = { userId, movieId, showtimeId, seats };
  const reservation = await reservationService.createReservation(reservationRequest);

  return res.status(201).json(reservation);
}

async function getReservations(req, res) { }

async function getReservation(req, res) { }

async function updateReservation(req, res) { }

async function deleteReservation(req, res) { }

export default {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
};
