import { Router, Request, Response } from 'express';

import { getUserController } from '../controllers/get-users';
import { createUserController } from '../controllers/create-users';
import { API_BASE_PATH } from './common';

import authMiddleware from '../middlewares/auth';

const BASE_PATH = `${API_BASE_PATH}/users`;

export default (): Router => {
  const router = Router();

  router.get(`${BASE_PATH}/:userId`, authMiddleware, async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await getUserController(res, userId);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  });

  router.post(`${BASE_PATH}`, async (req: Request, res: Response) => {
    const { userId, password } = req.body;
    const data = { userId, password };
    const result = await createUserController(res, data);
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
