import { Router, Request, Response } from 'express';
import { loginController } from '../controllers/login';
import { API_BASE_PATH } from './common';

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
  return router;
};
