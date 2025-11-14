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
    return res.status(409).json({ error: err.detail });
  }

  return res.sendStatus(201);
}

export async function login(req, res) {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = { email, password }

  try {
    const token = await authService.getToken(user);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}

export default {
  register,
  login,
};
