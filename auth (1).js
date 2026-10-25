import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
export const authenticateUser = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.imovies_access || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null);
  if (!token) throw new AppError(401, 'Please sign in to continue', 'AUTH_REQUIRED');
  let payload; try { payload = jwt.verify(token, env.JWT_ACCESS_SECRET); } catch { throw new AppError(401, 'Session is invalid or expired', 'INVALID_TOKEN'); }
  const user = await User.findById(payload.sub).select('_id name email role isActive');
  if (!user || !user.isActive) throw new AppError(401, 'Account is unavailable', 'ACCOUNT_UNAVAILABLE');
  req.user = user; next();
});
export const authorizeRoles = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return next(new AppError(403, 'You do not have permission to perform this action', 'INSUFFICIENT_PERMISSIONS'));
  next();
};
export const requireAdmin = [authenticateUser, authorizeRoles('ADMIN')];
