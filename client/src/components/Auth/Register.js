import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser} from '../../actions/authActions';
import TextFieldGroup from '../common/textFieldGroup';

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup 
                  error={errors.name}
                  onChange={this.handleOnChange}
                  value={this.state.name} 
                  type="text" 
                  className={errors.name ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} 
                  placeholder="Name" 
                  name="name"
                />

                <TextFieldGroup 
                  error={errors.email}
                  onChange={this.handleOnChange} 
                    value={this.state.email} 
                    type="email" 
                    className={errors.email ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} 
                    placeholder="Email Address" 
                    name="email"
                    info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
                />

                <TextFieldGroup 
                  error={errors.password}
                  onChange={this.handleOnChange} 
                  value={this.state.password} 
                  type="password" 
                  className={errors.password ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} 
                  placeholder="Password" 
                  name="password" 
                />

                <TextFieldGroup 
                  error={errors.password2}
                  onChange={this.handleOnChange} 
                    value={this.state.password2} 
                    type="password" 
                    className={errors.password2 ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} 
                    placeholder="Confirm Password" 
                    name="password2" 
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { registerUser })(withRouter(Register))