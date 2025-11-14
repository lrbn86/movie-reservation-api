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

export default {
  create,
};
