import authRepository from './auth.repository.js';
import authService from './auth.service.js';

export async function register(req, res) {
  if (!req.body?.email || !req.body?.password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { email, password } = req.body;
  const user = { email, password };

  await authService.createUser(authRepository, user);

  return res.json({ message: 'Register' });
}

export default {
  register
};
