const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

// post model
const Post = require('../../models/Post')
// post validation
const validatePostInput = require('../../validation/post')

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'posts test route successful'})
})

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  if(!isValid) {
    return res.status(400).json(errors)
  }

  const { text, name, avatar} = req.body

  const newPost = new Post({
    text,
    name,
    avatar,
    user: req.user.id
  })

  newPost.save().then(post => {
    res.json(post)
  })
})

module.exports = router