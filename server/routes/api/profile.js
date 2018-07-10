const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

// Load profile model
const Profile = require('../../models/Profile')
// Load user model
const User = require('../../models/User')

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'profile test route successful'})
})

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/',passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {}
  Profile
    .findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route   POST api/profile
// @desc    Create/edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }, (req, res) => {
  const {
    handle,
    company, 
    website,
    location,
    bio,
    status,
    githubusername,
    skills
  } = req.body

  // get fields
  const profileFields = {}
  profileFields.user = req.user.id

  if(handle) profileFields.handle = handle
  if(company) profileFields.company = company
  if(website) profileFields.website = website
  if(location) profileFields.location = location
  if(bio) profileFields.bio = bio
  if(status) profileFields.status = status
  if(githubusername) profileFields.githubusername = githubusername

  // skills - split into array
  if(typeof skills !== 'undefined') {
    profileFields.skills = skills.split(',')
  }

  // social
  const {
    youtube,
    facebook,
    linkedin,
    instagram,
    twitter
  } = req.body

  profileFields.social = {}

  if(youtube) profileFields.social.youtube = youtube
  if(facebook) profileFields.social.facebook = facebook
  if(linkedin) profileFields.social.linkedin = linkedin
  if(instagram) profileFields.social.instagram = instagram
  if(twitter) profileFields.social.twitter = twitter

  Profile
    .findOne({ user: req.user.id })
    .then(profile => {
      if(profile) {
        // update
        Profile
        .findOneAndUpdate(
            { user: req.user.id }, 
            { $set: profileFields }, 
            { new: true }
        )
        .then(profile => res.json(profile))
      } else {
        // check if handle exists
        Profile
          .findOne({ handle: profileFields.handle })
          .then(profile => {
            if(profile) {
              errors.handle = 'That handle already exists'
              res.status(400).json(errors)
            }

            // save profile
            new Profile(profileFields)
                  .save()
                  .then(profile => res.json(profile))
          })
      }
    })
}))

module.exports = router