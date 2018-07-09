const express = require('express')
const mongoose = require("mongoose")

const app = express()

// DB config
const db = require('./config/keys').mongoURI

// Connect to mongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('hello world')
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`)
})