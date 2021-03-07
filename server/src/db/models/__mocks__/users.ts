import { User } from '../users';

const now = Date.now() / 1000;
const users: User[] = [
  {
    userId: 'user1',
    created_at: now,
  },
  {
    userId: 'user2',
    created_at: now,
  },
  {
    userId: 'user3',
    created_at: now,
  },
];

export const getSingleUser = async (filter: any): Promise<User[]> => {
  const prop = Object.keys(filter)[0];
  return users.filter((user) => user[prop] === filter[prop]);
};

export const addUser = async (userId: string): Promise<User> => {
  const user = {
    userId,
    created_at: Math.floor(Date.now() / 1000),
  };
  users.push(user);
  return user;
};
