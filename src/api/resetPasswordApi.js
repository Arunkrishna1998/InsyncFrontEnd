import axios from 'axios';
import {BASE_URL} from '../config';

const resetPasswordApi = async (uid, token, password, confirmPassword) => {
  try {
    const formData = new FormData();

    if (password) formData.append('new_password', password);
    if (confirmPassword) formData.append('confirm_new_password', confirmPassword);

    const response = await axios.post(`${BASE_URL}/api/users/password-reset-confirm/${uid}/${token}/`, formData, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Email sent');
      alert("Password Reset Successfull");
      return response.data; // Resolve the promise with response data
    } else {
      console.log('Request failed with status code:', response.status);
      return Promise.reject(response); // Reject the promise with the response for error handling
    }
  } catch (error) {
    console.error('API request error:', error);
    return Promise.reject(error); // Reject the promise with the error for error handling
  }
};


export default resetPasswordApi;
