const express = require('express')
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { secretOrKey } = require('../../config/keys')

// load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// load user model
const User = require('../../models/User')

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'users test route successful'})
})

// @route   GET api/users/register
// @desc    Register users route
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const { email, name, password } = req.body

  User
    .findOne({ email })
    .then(user => {
      if(user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors)
      } else {
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        })

        const newUser = new User({
          name,
          email,
          avatar,
          password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash
            newUser
              .save()
              .then(user => {
                res.json(user)
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
})

// @route   GET api/users/login
// @desc    Login users route / Returning JWT token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const { email, password } = req.body

  // find user by email
  User
    .findOne({ email }) 
    .then(user => {
      const { id, name, avatar } = user

      // check for user
      if(!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors)
      }

      // check password
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // user matched
            const payload = { id, name, avatar }

            // sign token
            jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            })
          } else {
            errors.password = 'Incorrect password'
            return res.status(400).json(errors)
          }
        })
    })
})

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, name, email } = req.user
  res.json({ id, name, email })
})

module.exports = router