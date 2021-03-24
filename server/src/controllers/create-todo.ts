import { Response } from 'express';
import { addTodo, Todo } from '../db/models/todos';
import { handleInternalError, handleInvalidParameter } from '../routers/common';
import { todoValidator } from '../validators/todos';
import { getUserController } from './get-users';

export const createTodoController = async (res: Response, userId: string, todo: Todo) => {
  const isValid = await todoValidator(todo);
  if (!isValid) {
    handleInvalidParameter(res);
    return null;
  }
  try {
    const user = await getUserController(res, userId);
    if (!user) {
      return null;
    }
    const result = await addTodo(todo);
    return result;
  } catch (error) {
    console.log(error.message);
    handleInternalError(res, error.message);
    return null;
  }
};
