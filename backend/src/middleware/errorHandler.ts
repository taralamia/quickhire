import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/common.types';

const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err.status ?? 500;
  const message = err.message ?? 'Internal Server Error';
  console.error(`[Error] ${status} – ${message}`);
  res.status(status).json({ success: false, message });
};

export default errorHandler;