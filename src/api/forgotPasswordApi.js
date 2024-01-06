import axios from 'axios';
import {BASE_URL} from '../config';

const forgotPasswordApi = async (email) => {
  try {
    const formData = new FormData();

    if (email) formData.append('email', email);

    const response = await axios.post(`${BASE_URL}/api/users/forgot-password/`, formData, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Email sent');
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


export default forgotPasswordApi;
