import { NextFunction } from 'express';
import { AppError } from '../../utils/appError.js';

/**
 * Forwards a new AppError specifying that the user wasn't found
 * @param {NextFunction} next
 * @returns void
 */
export const userNotFound = (next: NextFunction): void =>
  next(new AppError('User not found', 404));
