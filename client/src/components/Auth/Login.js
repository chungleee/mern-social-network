import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/textFieldGroup';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }

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

  handleOnSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData)
  }

  render() {
    const { errors } = this.state
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.handleOnSubmit}>
                <TextFieldGroup
                  value={this.state.email}
                  type="email" 
                  className={errors.email ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} 
                  placeholder="Email Address" 
                  name="email"
                  onChange={this.handleOnChange}
                  error={errors.email}
                />

                <TextFieldGroup 
                  value={this.state.password}
                  type="password" 
                  className={errors.password ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} 
                  placeholder="Password" 
                  name="password" 
                  onChange={this.handleOnChange}
                  error={errors.password}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { loginUser })(Login)