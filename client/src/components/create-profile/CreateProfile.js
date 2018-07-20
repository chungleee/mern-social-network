import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/textFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const {handle, company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram} = this.state

    const profileData = {handle, company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram}

    this.props.createProfile(profileData, this.props.history)
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    // destructuring
    const { errors, handle, status, company, website, location, skills, githubusername, bio, displaySocialInputs } = this.state

    let socialInputs
    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup 
            placeholder="Twitter profile URL"
            name='twitter'
            icon='fab fa-twitter'
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup 
            placeholder="Facebook profile URL"
            name='facebook'
            icon='fab fa-facebook'
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup 
            placeholder="Youtube profile URL"
            name='youtube'
            icon='fab fa-youtube'
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup 
            placeholder="Linkedin profile URL"
            name='linkedin'
            icon='fab fa-linkedin'
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup 
            placeholder="instagram profile URL"
            name='instagram'
            icon='fab fa-instagram'
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      )
    }

    // select options for status
    const options = [
      {label: '* Select Professional Status', value: 0},
      {label: 'Developer', value: 'Developer'},
      {label: 'Junior Developer', value: 'Junior Developer'},
      {label: 'Senior Developer', value: 'Senior Developer'},
      {label: 'Freelancer', value: 'Freelancer'},
    ]
    return (
      <div className='create-profile'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name='handle'
                  value={handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info='Unique handle'
                />

                <SelectListGroup
                  placeholder='Status'
                  name='status'
                  value={status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info='Give us an idea of where you are at in your career'
                />

                <TextFieldGroup
                  placeholder="Company"
                  name='company'
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                  info='Could be your own company or one you work for'
                />

                <TextFieldGroup
                  placeholder="Website"
                  name='website'
                  value={website}
                  onChange={this.onChange}
                  error={errors.website}
                  info='Could be your own website or one you work for'
                />

                <TextFieldGroup
                  placeholder="Location"
                  name='location'
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                  info='Your current location'
                />

                <TextFieldGroup
                  placeholder="Skills"
                  name='skills'
                  value={skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info='Use a comma to seperate values'
                />

                <TextFieldGroup
                  placeholder="Github Username"
                  name='githubusername'
                  value={githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info='If you want your latest repos and a Github link'
                />

                <TextAreaFieldGroup
                  placeholder="Short bio"
                  name='bio'
                  value={bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info='Tell us a little about yourself'
                />

                <div className="mb-3">
                  <button 
                    type='button'
                    onClick={() => {
                      this.setState((prevState) => {
                        return {
                          displaySocialInputs: !prevState.displaySocialInputs
                        }
                      })
                    }} 
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input 
                  type="submit" 
                  value="Submit" 
                  className='btn btn-info btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}

export default connect(mapStateToProps, {createProfile})(CreateProfile)