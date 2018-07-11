const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

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
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {}

  Profile
    .find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if(!profiles) {
        errors.noprofile = 'There are no profiles'
        return res.status(404).json(errors)
      }

      res.json(profiles)
    })
    .catch(err => {
      errors.noprofile = 'There are no profiles'
      res.status(404).json(errors)
    })
})



// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {}
  Profile
    .findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user'
        res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(err => {
      errors.noprofile = 'There is no profile for this user'
      res.status(404).json(errors)
    })
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {}
  Profile
    .findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user'
        res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(err => {
      errors.noprofile = 'There is no profile for this user'
      res.status(404).json(errors)
    })
})


// @route   POST api/profile
// @desc    Create/edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)

  if(!isValid) {
    // return any errors
    return res.status(400).json(errors)
  }

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
})

// @route   POST api/profile/experience
// @desc    Create/edit experience to profile route
// @access  Private
router.post('/experience', passport.authenticate('jwt', {session:false}), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body)

  if(!isValid) {
    // return any errors
    return res.status(400).json(errors)
  }

  Profile
    .findOne({ user: req.user.id })
    .then(profile => {
      // destructuring
      const { title, company, location, from, to, current, description } = req.body

      // fields assignment
      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      }

      // Add to exp array
      profile.experience.unshift(newExp)

      profile
        .save()
        .then(profile => {
          res.json(profile)
        })
    })
})

// @route   POST api/profile/education
// @desc    Create/edit education to profile route
// @access  Private
router.post('/education', passport.authenticate('jwt', {session:false}), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body)

  if(!isValid) {
    // return any errors
    return res.status(400).json(errors)
  }

  Profile
    .findOne({ user: req.user.id })
    .then(profile => {
      // destructuring
      const { school, degree, fieldofstudy, from, to, current, description } = req.body

      // fields assignment
      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      }

      // Add to exp array
      profile.education.unshift(newEdu)

      profile
        .save()
        .then(profile => {
          res.json(profile)
        })
    })
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience to profile route
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session:false}), (req, res) => {
  Profile
    .findOne({user: req.user.id})
    .then(profile => {
      // get remove index
      const removeIdx = profile.experience.map(item => {
        return item.id
      })
      .indexOf(req.params.exp_id)

      profile.experience.splice(removeIdx, 1)

      profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err))
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education to profile route
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session:false}), (req, res) => {
  Profile
    .findOne({user: req.user.id})
    .then(profile => {
      // get remove index
      const removeIdx = profile.education.map(item => {
        return item.id
      })
      .indexOf(req.params.edu_id)

      profile.education.splice(removeIdx, 1)

      profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err))
})

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', {session:false}), (req, res) => {
  Profile
    .findOneAndRemove({user: req.user.id})
    .then(() => {
      User
        .findOneAndRemove({_id: req.user.id})
        .then(() => {
          res.json({ success: true})
        })
    })
})


module.exports = router