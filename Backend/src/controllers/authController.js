import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { User, RefreshToken, Cart } from '../models/index.js';
import { signAccessToken, generateRefreshTokenString, getRefreshExpiryDate } from '../utils/tokens.js';

const REFRESH_COOKIE = 'psc_refresh';

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password, firstName, lastName } = req.body;
  const existing = await User.scope('withSensitive').findOne({ where: { email } });
  if (existing) return res.status(409).json({ error: 'Email already in use' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, firstName, lastName });
  await Cart.create({ UserId: user.id });
  const access = signAccessToken({ sub: user.id, role: user.role });
  const tokenStr = generateRefreshTokenString();
  const refresh = await RefreshToken.create({
    token: tokenStr,
    expiresAt: getRefreshExpiryDate(),
    UserId: user.id,
    userAgent: req.get('user-agent'),
    ipAddress: req.ip,
  });
  res.cookie(REFRESH_COOKIE, refresh.token, { httpOnly: true, secure: false, sameSite: 'lax', path: '/' });
  return res.status(201).json({ accessToken: access, user });
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const user = await User.scope('withSensitive').findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const access = signAccessToken({ sub: user.id, role: user.role });
  const tokenStr = generateRefreshTokenString();
  const refresh = await RefreshToken.create({
    token: tokenStr,
    expiresAt: getRefreshExpiryDate(),
    UserId: user.id,
    userAgent: req.get('user-agent'),
    ipAddress: req.ip,
  });
  res.cookie(REFRESH_COOKIE, refresh.token, { httpOnly: true, secure: false, sameSite: 'lax', path: '/' });
  return res.json({ accessToken: access, user });
}

export async function me(req, res) {
  return res.json({ user: req.user });
}

export async function refresh(req, res) {
  const token = req.cookies[REFRESH_COOKIE];
  if (!token) return res.status(401).json({ error: 'Missing refresh token' });
  const record = await RefreshToken.findOne({ where: { token, revokedAt: null } });
  if (!record) return res.status(401).json({ error: 'Invalid refresh token' });
  if (new Date(record.expiresAt) < new Date()) return res.status(401).json({ error: 'Refresh token expired' });
  const user = await User.findByPk(record.UserId);
  if (!user) return res.status(401).json({ error: 'Invalid user' });
  const access = signAccessToken({ sub: user.id, role: user.role });
  return res.json({ accessToken: access });
}

export async function logout(req, res) {
  const token = req.cookies[REFRESH_COOKIE];
  if (token) {
    await RefreshToken.update({ revokedAt: new Date() }, { where: { token } });
    res.clearCookie(REFRESH_COOKIE, { path: '/' });
  }
  return res.json({ success: true });
}
