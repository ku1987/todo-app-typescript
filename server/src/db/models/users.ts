import knex from '../connection';

export interface User {
  id: number;
  userId: string;
  password: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}

export const getSingleUser = async (filter: any): Promise<User | null> => {
  const result = await knex('users').where({
    ...filter,
    deleted_at: null,
  });
  if (result.length !== 1) {
    return null;
  }
  return result[0];
};

export const addUser = async (userId: string, password: string): Promise<User> => {
  const data = {
    userId,
    password,
  };
  const result = await knex('users').insert(data).returning('*');
  return result[0];
};
