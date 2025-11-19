import jwt from 'jsonwebtoken';

async function authenticate(req, res, next) {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token in authorization header' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret key required for verifying');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export default authenticate;
