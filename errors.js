import { AppError } from '../utils/AppError.js';
export function notFoundHandler(req, _res, next) { next(new AppError(404, `Route not found: ${req.method} ${req.path}`, 'ROUTE_NOT_FOUND')); }
export function errorHandler(err, req, res, _next) {
  const status = err.statusCode || (err.name === 'ValidationError' ? 400 : err.code === 11000 ? 409 : 500);
  const code = err.code && typeof err.code === 'string' ? err.code : err.code === 11000 ? 'DUPLICATE_RESOURCE' : status === 500 ? 'INTERNAL_ERROR' : 'VALIDATION_FAILED';
  if (status >= 500) console.error(JSON.stringify({ level:'error', requestId:req.id, message:err.message, path:req.path }));
  res.status(status).json({ success:false, message:status >= 500 && process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message, code, requestId:req.id });
}
