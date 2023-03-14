import * as dotenv from 'dotenv'
import express from 'express'
dotenv.config()

const app = express()
const PORT = 3000

app.get('/', (req, resp) => {
  return resp.json({
    hello: 'world',
  })
})

app.listen(PORT)
