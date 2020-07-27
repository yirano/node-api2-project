const express = require('express')
const cors = require('cors')

const postsRouter = require('./posts/posts-router')

const server = express()

const PORT = 8000

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `)
})

server.use('/api/posts', postsRouter)

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})