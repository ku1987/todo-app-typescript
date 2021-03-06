import { Response } from 'express';

export const API_BASE_PATH = '/api/v1';

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

export const handleInvalidParameter = (res: Response): void => {
  handleError(res, 400, 'Parameter is invalid.');
};

export const handleNotFound = (res: Response, message: string): void => {
  handleError(res, 404, `${message}: not found.`);
};

export const handleForbidden = (res: Response): void => {
  handleError(res, 403, 'Forbidden.');
};
