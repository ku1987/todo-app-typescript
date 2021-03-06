import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import healthRouter from './routers/health';
import usersRouter from './routers/users';
import keysRouter from './routers/keys';
import loginRouter from './routers/login';
import todoRouter from './routers/todos';

const app = express();
app.use(cors());

app.use(express.json({ limit: '20mb' }));
app.use(morgan('combined'));
app.use(helmet());

app.use(healthRouter());
app.use(usersRouter());
app.use(keysRouter());
app.use(loginRouter());
app.use(todoRouter());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

process
  .on('unhandledRejection', (reason) => {
    console.error(reason, 'Unhandled rejection occurred.');
  })
  .on('uncaughtException', (reason) => {
    console.error(reason, 'Unhandled exception occurred.');
  });
