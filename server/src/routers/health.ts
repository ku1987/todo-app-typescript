import { Router, Request, Response } from 'express';

const BASE_PATH = 'health';

export default () => {
  const router = Router();

  router.post(`/${BASE_PATH}`, async (req: Request, res: Response) => {
    const { health = null } = req.body;
    if (health === 'good') {
      res.status(200).json({
        status: 'success',
        data: health,
      });
    }
    res.status(400).json({
      status: 'fail',
    });
  });

  return router;
};