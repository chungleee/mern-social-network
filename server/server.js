const express = require('express')
const mongoose = require("mongoose")
const passport = require('passport')

// routes
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// DB config
const db = require('./config/keys').mongoURI

// Connect to mongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err))

// passport middlware
app.use(passport.initialize())

// passport config
require('./config/passport')(passport)

// use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`)
})