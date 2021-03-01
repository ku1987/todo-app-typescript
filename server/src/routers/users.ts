import { Router, Request, Response } from 'express';
import { getUserController } from '../controllers/get-users';
import { createUserController } from '../controllers/create-users';

const BASE_PATH = '/users';

export default (): Router => {
  const router = Router();

  router.get(`${BASE_PATH}/:userId`, async (req: Request, res: Response) => {
    const { userId } = req.params;
    await getUserController(res, userId);
  });

  router.post(`${BASE_PATH}/:userId`, async (req: Request, res: Response) => {
    const { userId } = req.params;
    await createUserController(res, userId);
  });

  return router;
};
