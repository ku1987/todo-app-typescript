import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import morgan from 'morgan';

import healthRouter from './routers/health';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('combined'))
app.use(healthRouter());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
