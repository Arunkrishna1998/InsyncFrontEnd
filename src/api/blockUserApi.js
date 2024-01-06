import axios from 'axios';
import { BASE_URL } from '../config';

const blockUserApi = async (postId) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    let body = {}
    const response = await axios.post(`${BASE_URL}/api/users/block/${postId}/`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
        return response.data
    }
  } catch (error) {
    return error
  }
};

export default blockUserApi;
