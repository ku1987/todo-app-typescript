import express from 'express';
import supertest from 'supertest';
import userRouter from '../../routers/users';

describe('User router', () => {
  it('Get a single user', async () => {
    const app = express();
    app.use(userRouter());
    const response = await supertest(app).get('/users/test');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.userId).toBe('test');
  });
  it('Create a user', async () => {
    const app = express();
    app.use(express.json());
    app.use(userRouter());
    const userId = `test-user-${Date.now()}`;
    const response = await supertest(app).post(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.userId).toBe(userId);
  });
});
