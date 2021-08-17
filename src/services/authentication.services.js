import axios from 'axios';
import { register, login, verifyEmail } from '../constants/apiURLs';

export const signUp = (authData) => {
    return new Promise((resolve, reject) => {
      axios
        .post(register,JSON.stringify(authData))
        .then((response) => {
          if(response.data && response.data.error) {
            reject(new Error(response.data.data));
          }
          resolve();
        })
        .catch((err) => reject(err))
    })
}

export const signIn = (authData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(login,JSON.stringify(authData))
      .then((response) => {
        if(response.data && response.data.error) {
          reject(new Error(response.data.data));
        }
        resolve(response.data.data);
      })
      .catch((err) => reject(err))
  })
}

export const verifyEmailwithToken = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(verifyEmail,JSON.stringify({ token }))
      .then((response) => {
        if(response.data && response.data.error) {
          reject(new Error(response.data.data));
        }
        resolve(response.data.data);
      })
      .catch((err) => reject(err))
  })
}