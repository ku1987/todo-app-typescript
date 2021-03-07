import { Router, Request, Response } from 'express';
import { getKey, createKey, getKeyByUser } from '../controllers/keys';
import { handleInternalError, handleParameterMissing } from './common';

const BASE_PATH = '/keys';

export default (): Router => {
  const router = Router();

  router.get(`${BASE_PATH}/key/:accessKey`, async (req: Request, res: Response) => {
    const { accessKey } = req.params;
    const userId = req.headers['user-id'] as string;

    if (!accessKey || !userId) {
      handleParameterMissing(res, 'Access key and/or User ID');
      return;
    }
    try {
      const key = await getKey(res, userId, accessKey);
      if (!key) {
        return;
      }
      res.status(200).json({
        status: 'success',
        data: key,
      });
    } catch (error) {
      handleInternalError(res, 'Unable to get a key.');
    }
  });

  router.get(`${BASE_PATH}/user/:userId`, async (req: Request, res: Response) => {
    const { userId } = req.params;
    const accessUser = req.headers['user-id'] as string;

    if (!accessUser || !userId) {
      handleParameterMissing(res, 'Access key and/or User ID');
      return;
    }
    try {
      const key = await getKeyByUser(res, userId, accessUser);
      if (!key) {
        return;
      }
      res.status(200).json({
        status: 'success',
        data: key,
      });
    } catch (error) {
      handleInternalError(res, 'Unable to get a key.');
    }
  });

  router.post(`${BASE_PATH}/:userId`, async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) {
      handleParameterMissing(res, 'User ID');
      return;
    }
    try {
      const key = await createKey(res, userId);
      if (!key) {
        return;
      }
      res.status(200).json({
        status: 'success',
        data: key,
      });
    } catch (error) {
      handleInternalError(res, 'Unable to create a key.');
    }
  });

  return router;
};
