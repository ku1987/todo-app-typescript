import knex from '../connection';

interface User {
  userId: string;
  created_at: number;
}

export const getSingleUser = async (filter: any): Promise<User[]> => {
  try {
    const result = await knex('users').where({
      ...filter,
      deleted_at: null,
    });
    if (result.length !== 1) {
      return [];
    }
    return result[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addUser = async (userId: string): Promise<User> => {
  const result = {
    userId,
    created_at: Math.floor(Date.now() / 1000),
  };
  try {
    await knex('users').insert(result);
  } catch (error) {
    throw new Error(error.message);
  }
  return result;
};
