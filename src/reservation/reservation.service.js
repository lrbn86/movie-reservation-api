import reservationRepository from './reservation.repository.js';

async function createReservation(reservationRequest) {
  validate(reservationRequest);
  await checkAvailability(reservationRequest);

  const reservation = await reservationRepository.create(reservationRequest);

  return reservation;
}

async function getUpcomingReservations() {
}

async function cancelReservation(id) { }
async function getShowtimesByDate(date) { }
async function getAllReservations() { }

function validate(reservationRequest) {
  const userId = reservationRequest?.userId;
  const movieId = reservationRequest?.movieId;
  const showtime = reservationRequest?.showtime;
  const seats = reservationRequest?.seats;

  if (!userId || !movieId || !showtime || !seats) {
    throw new Error('Invalid reservation request');
  }
}

async function checkAvailability(reservationRequest) {
  const { showtime, seats } = reservationRequest;
  const hasShowtime = await reservationRepository.findShowtime(showtime);
  const hasValidSeats = await reservationRepository.findSeats(seats);

  if (!hasShowtime || !hasValidSeats) {
    throw new Error('Reservation could not be made due to no availability');
  }
}

export default {
  createReservation,
  getUpcomingReservations,
  cancelReservation,
  getShowtimesByDate,
  getAllReservations,
};
