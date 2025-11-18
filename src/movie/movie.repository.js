import crypto from 'node:crypto';

async function create(data) {
  const movie = {
    id: crypto.randomUUID(),
    title: data.title,
    description: data.description,
    posterImageUrl: data.posterImageUrl || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return movie;
}

async function getAll() {
  return [];
}

async function getById(id) {
  return null;
}

async function update(id, data) {
  return null;
}

async function remove(id) {

}

export default {
  create,
  getAll,
  getById,
  update,
  remove,
};
