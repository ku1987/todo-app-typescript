import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import healthRouter from "./routers/health";

const app = express();

app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());
app.use(morgan("combined"));

app.use(healthRouter());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
