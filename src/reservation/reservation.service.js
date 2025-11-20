import reservationRepository from './reservation.repository.js';

async function createReservation(data) {
  const title = data?.title;
  const seats = data?.seats;
  const date = data?.date;

  const reservation = await reservationRepository.create({ title, seats, date });

  return reservation;
}

export default {
  createReservation,
};
