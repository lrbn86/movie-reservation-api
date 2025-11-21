async function create(data) {
  const reservation = { status: 'reserved', ...data };
  return reservation;
}

async function getAll() { }
async function getById() { }
async function update() { }
async function remove() { }

async function findShowtime(showtime) { }
async function findSeats(seats) { }

export default {
  create,
  getAll,
  getById,
  update,
  remove,
  findShowtime,
  findSeats,
};
