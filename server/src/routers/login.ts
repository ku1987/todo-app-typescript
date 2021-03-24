import { Router, Request, Response } from 'express';
import { loginController } from '../controllers/login';
import { authController } from '../controllers/auth';
import { handleParameterMissing, API_BASE_PATH } from './common';

const BASE_PATH = `${API_BASE_PATH}/login`;

export default (): Router => {
  const router = Router();

  router.post(`${BASE_PATH}`, async (req: Request, res: Response) => {
    const { userId, password } = req.body;
    const result = await loginController(res, userId, password);
    if (!result) {
      return;
    }
    res.status(200).json({
      status: 'success',
      data: result,
    });
  });

  router.get(`${BASE_PATH}/auth`, async (req: Request, res: Response) => {
    const auth = req.headers['authorization'];
    if (!auth) {
      handleParameterMissing(res, 'Authorization');
      return;
    }
    const result = await authController(res, auth);
    if (!result) {
      return;
    }
    res.status(200).json({
      status: 'success',
      data: result,
    });
  });

  return router;
};
