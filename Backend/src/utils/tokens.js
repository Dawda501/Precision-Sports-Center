import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '15m';
const REFRESH_TOKEN_TTL_SECONDS = parseInt(process.env.REFRESH_TOKEN_TTL_SECONDS || `${7 * 24 * 60 * 60}`); // 7d

export function signAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function generateRefreshTokenString() {
  return crypto.randomBytes(64).toString('hex');
}

export function getRefreshExpiryDate() {
  const expires = new Date();
  expires.setSeconds(expires.getSeconds() + REFRESH_TOKEN_TTL_SECONDS);
  return expires;
}
