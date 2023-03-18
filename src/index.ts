import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import "./server";
import {EmmployeeRouter} from './api/routes/employee'
import {SupervisorRoutes} from './api/routes/supervisor'
import {VERSIONAPI} from './constants'
const cors = require('cors');

const app = express()
app.use(express.json())
const PORT = 3000

app.use(cors());
app.get('/', (req, resp) => {
  return resp.json({
    hello: 'hypnos',
    version: VERSIONAPI,
  })
});

app.use(SupervisorRoutes);
app.use(EmmployeeRouter);
app.listen(PORT);

export default app;