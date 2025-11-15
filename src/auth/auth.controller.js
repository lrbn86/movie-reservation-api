import authService from './auth.service.js';

async function register(req, res) {
  const email = req.body?.email
  const password = req.body?.password;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = { email, password };

  try {
    await authService.createUser(user);
  } catch (err) {
    if (err.message === 'Invalid email') {
      return res.status(400).json({ error: err.message })
    }
    if (err.message === 'Email already registered') {
      return res.status(409).json({ error: err.message });
    }
  }

  return res.sendStatus(201);
}

async function login(req, res) {
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
