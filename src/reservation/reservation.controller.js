import reservationService from './reservation.service.js';

async function addReservation(req, res) {
  const title = req.body?.title;
  const seats = req.body?.seats;
  const date = req.body?.date;

  if (!title) {
    return res.status(400).json({ error: 'Missing title' });
  }

  if (!seats) {
    return res.status(400).json({ error: 'Missing seats' });
  }

  if (!date) {
    return res.status(400).json({ error: 'Missing date' });
  }

  const reservation = await reservationService.createReservation({ title, seats, date });

  return res.status(201).json(reservation);
}

async function getReservations(req, res) { }

async function getReservation(req, res) { }

async function updateReservation(req, res) { }

async function deleteReservation(req, res) { }

export default {
  addReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
};
