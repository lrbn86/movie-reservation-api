import authService from './auth.service.js';

export async function register(req, res) {
  const email = req.body?.email
  const password = req.body?.password;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = { email, password };

  try {
    await authService.createUser(user);
  } catch (err) {
    return res.status(409).json(err.detail);
  }

  return res.sendStatus(201);
}

export default {
  register
};
