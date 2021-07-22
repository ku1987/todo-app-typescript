import knex from '../connection';

export interface User {
  userId: string;
  password: string;
  created_at: number;
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
  const result = {
    userId,
    password,
    created_at: Math.floor(Date.now() / 1000),
  };
  await knex('users').insert(result);
  return result;
};
