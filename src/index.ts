import express from 'express';
import "./server";
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.get('/', (req, resp) => {
  return resp.json({
    hello: 'world',
  })
});

app.listen(PORT); 

export default app;