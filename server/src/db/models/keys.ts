import knex from '../connection';

export interface Key {
  accessKey: string;
  secretKey: string;
  userId: string;
  created_at?: number;
}

export const getKeyByAccessKey = async (accessKey: string): Promise<Key | null> => {
  try {
    const result = await knex('keys').where({
      accessKey,
      deleted_at: null,
    });
    if (result.length !== 1) {
      return null;
    }
    return result[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getKeyByUserId = async (userId: string): Promise<Key | null> => {
  try {
    const result = await knex('keys').where({
      userId,
      deleted_at: null,
    });
    if (result.length !== 1) {
      return null;
    }
    return result[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addKey = async (key: Key): Promise<void> => {
  const result = {
    ...key,
    created_at: Math.floor(Date.now() / 1000),
  };
  try {
    await knex('keys').insert(result);
  } catch (error) {
    throw new Error(error.message);
  }
};
