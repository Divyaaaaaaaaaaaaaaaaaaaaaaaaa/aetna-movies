import { Request, Response, NextFunction } from 'express';
const ApiError = require('./movieError');

export const pageValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page } = req.query;
  if (page !== undefined) {
    const pageStr = String(page);
    const pageNum = parseInt(pageStr, 10);
    if (isNaN(pageNum) || pageNum < 1) {
      return next(
        new ApiError(400, 'Invalid param', {
          param: 'page',
          message: 'Should be greater than or equal to 1',
        })
      );
    }
    req.query.page = pageNum.toString();
  }
  next();
};

export const yearValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { year } = req.params;
  const yearRegex = /^\d{4}$/;
  const currentYear = new Date().getFullYear();
  if (
    !yearRegex.test(year) ||
    Number(year) < 1800 ||
    Number(year) > currentYear
  ) {
    return next(
      new ApiError(400, 'Invalid param', {
        param: 'year',
        message: `Should be a 4-digit number between 1900 and ${currentYear}`,
      })
    );
  }
  next();
};

export const genreValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { genre } = req.params;
  if (!genre || typeof genre !== 'string' || !/^[a-zA-Z\s]+$/.test(genre)) {
    return next(
      new ApiError(400, 'Invalid Param', {
        param: 'genre',
        message: 'Should be a non-empty string with only letters and spaces',
      })
    );
  }
  next();
};

export const movieIdValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const idRegex = /^[A-Za-z0-9_-]+$/;
  if (!id || typeof id !== 'string' || !idRegex.test(id)) {
    return next(
      new ApiError(400, 'Invalid Param', {
        param: 'id',
        message:
          'Movie ID should contain only letters, numbers, underscores, or hyphens',
      })
    );
  }
  next();
};

export const orderValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { order } = req.query;
  if (order !== undefined) {
    const orderStr = String(order).toLowerCase();
    if (orderStr !== 'asc' && orderStr !== 'desc') {
      return next(
        new ApiError(400, 'Invalid Param', {
          param: 'order',
          message: 'Should be either asc or desc',
        })
      );
    }
    req.query.order = orderStr;
  }
  next();
};
