import React, { Component } from 'react';

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
    console.log(newUser);
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    onChange={this.handleOnChange}
                    value={this.state.name} 
                    type="text" 
                    className="form-control form-control-lg" 
                    placeholder="Name" 
                    name="name" 
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.handleOnChange} 
                    value={this.state.email} 
                    type="email" 
                    className="form-control form-control-lg" 
                    placeholder="Email Address" 
                    name="email" 
                  />
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input
                    onChange={this.handleOnChange} 
                    value={this.state.password} 
                    type="password" 
                    className="form-control form-control-lg" 
                    placeholder="Password" 
                    name="password" 
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.handleOnChange} 
                    value={this.state.password2} 
                    type="password" 
                    className="form-control form-control-lg" 
                    placeholder="Confirm Password" 
                    name="password2" 
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register