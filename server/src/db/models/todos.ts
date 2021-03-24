import knex from '../connection';

type Priority = 1 | 2 | 3;

export interface Todo {
  userId: string;
  name: string;
  description: string;
  priority: Priority;
  dueDate: number;
}

export const getTodos = async (filter: any): Promise<Todo[]> => {
  try {
    const result = await knex('todos').where({
      ...filter,
      deleted_at: null,
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addTodo = async (todo: Todo): Promise<Todo> => {
  const result = {
    ...todo,
    created_at: Math.floor(Date.now() / 1000),
  };
  await knex('todos').insert(result);
  return result;
};
