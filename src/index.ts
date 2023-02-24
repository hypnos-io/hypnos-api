import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, resp) => {
  return resp.json({
    hello: 'world',
  })
})

app.listen(PORT)
