import { Router, Request, Response } from 'express';
import { createTodoController } from '../controllers/create-todo';
import { getTodoById, getTodoByUserId } from '../controllers/get-todos';
import { API_BASE_PATH, handleInvalidParameter } from './common';

const BASE_PATH = `${API_BASE_PATH}/todo`;

export default () => {
  const router = Router();

  router.get(`${BASE_PATH}/:id`, async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = Number.parseInt(id, 10);
    if (!parsedId || Number.isNaN(parsedId)) {
      handleInvalidParameter(res);
      return;
    }
    const todo = await getTodoById(res, parsedId);
    if (!todo) {
      return;
    }
    res.status(200).json({
      status: 'success',
      data: todo,
    });
  });

  router.get(`${BASE_PATH}/user/:userId`, async (req: Request, res: Response) => {
    const { userId } = req.params;
    const todos = await getTodoByUserId(res, userId);
    res.status(200).json({
      status: 'success',
      data: todos,
    });
  });

  router.post(`${BASE_PATH}`, async (req: Request, res: Response) => {
    const userId = req.headers['user-id'] as string;
    const { name, description, priority, dueDate } = req.body;
    const todoData = {
      userId,
      name,
      description,
      priority,
      dueDate,
    };
    const result = await createTodoController(res, userId, todoData);
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
