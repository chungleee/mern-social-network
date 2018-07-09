const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const { secretOrKey } = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secretOrKey

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    const { id } = jwt_payload
    User
      .findById(id)
      .then(user => {
        if(user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  }))
}