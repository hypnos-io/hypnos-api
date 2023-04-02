import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import "./server";
import {EmmployeeRouter} from './api/routes/employee'
import {SupervisorRoutes} from './api/routes/supervisor'
import {VERSIONAPI} from './constants'
const cors = require('cors');
const { server, io } = require("./server");

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

// Use the server from the server.js file instead of calling app.listen
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the io object to use it in other files if needed
module.exports = { io };
