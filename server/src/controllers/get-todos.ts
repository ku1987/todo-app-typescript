import { Response } from 'express';
import { getTodos } from '../db/models/todos';
import { handleNotFound } from '../routers/common';

export const getTodoByUserId = async (res: Response, userId: string) => {
  const todos = await getTodos({ userId });
  return todos;
};

export const getTodoById = async (res: Response, id: number) => {
  const todos = await getTodos({ id });
  if (todos.length === 0) {
    handleNotFound(res, 'Todo');
    return null;
  }
  return todos[0];
};
