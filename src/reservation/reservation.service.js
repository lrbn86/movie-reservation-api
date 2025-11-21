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
  const showtimeId = reservationRequest?.showtimeId;
  const seats = reservationRequest?.seats;


  if (!userId || !movieId || !showtimeId || !seats) {
    throw new Error('Invalid reservation request');
  }
}

async function checkAvailability(reservationRequest) {
  const { showtimeId, seats } = reservationRequest;
  const hasShowtime = await reservationRepository.findShowtime(showtimeId);
  const hasValidSeats = await reservationRepository.findSeats(seats);

  if (!hasShowtime) {
    throw new Error('Invalid showtime');
  }

  if (!hasValidSeats) {
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
