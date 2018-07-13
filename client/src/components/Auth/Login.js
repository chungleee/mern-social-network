import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(user);
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <input
                    value={this.state.email}
                    type="email" 
                    className="form-control form-control-lg" 
                    placeholder="Email Address" 
                    name="email"
                    onChange={this.handleOnChange} 
                  />
                </div>
                <div className="form-group">
                  <input 
                    value={this.state.value}
                    type="password" 
                    className="form-control form-control-lg" 
                    placeholder="Password" 
                    name="password" 
                    onChange={this.handleOnChange}
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

export default Login