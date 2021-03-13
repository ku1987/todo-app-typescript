import { Router, Request, Response } from 'express';
import { getUserController } from '../controllers/get-users';
import { createUserController } from '../controllers/create-users';

const BASE_PATH = '/users';

export default (): Router => {
  const router = Router();

  router.get(`${BASE_PATH}/:userId`, async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await getUserController(res, userId);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  });

  router.post(`${BASE_PATH}/:userId`, async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { password } = req.body;
    const result = await createUserController(res, userId, password);
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
