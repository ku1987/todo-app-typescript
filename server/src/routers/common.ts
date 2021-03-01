import { Request, Response } from 'express';

export const handleError = (res: Response, code: number, message: string): void => {
  res.status(code).json({
    status: 'fail',
    data: {
      code,
      message,
    },
  });
};

export const handleInternalError = (res: Response, message: string): void => {
  handleError(res, 500, message);
};

export const handleParameterMissing = (res: Response, message: string): void => {
  handleError(res, 400, `${message} is required.`);
};

export const handleNotFound = (res: Response, message: string): void => {
  handleError(res, 404, `${message}: not found.`);
};
