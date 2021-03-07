import { User } from '../../db/models/users';

const now = Date.now() / 1000;
export const users: User[] = [
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
