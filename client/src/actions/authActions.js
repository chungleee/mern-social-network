import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './contants';

// register user
export const registerUser = (userData, history) => dispatch =>  {
  axios.post('api/users/register', userData)
  .then(res => {
    history.push('/login')
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
};


// login - get user token
export const loginUser = (userData) => dispatch => {
  axios.post('api/users/login', userData)
    .then(res => {
      // save to localStorage
      const { token } = res.data
      // set token to localStore
      localStorage.setItem('jwtToken', token)
      // set to auth header
      setAuthToken(token)
      // decode token to get user data
      const decoded = jwt_decode(token)
      // set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};


// set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch =>  {
  // remove token from localStorage
  localStorage.removeItem('jwtToken')
  // remove auth header
  setAuthToken(false)
  // set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
};