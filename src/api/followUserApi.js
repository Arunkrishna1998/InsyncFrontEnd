import axios from 'axios';
import { BASE_URL } from '../config';

const followUserApi = async (userId, fetchData) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    let body = {}
    const response = await axios.post(`${BASE_URL}/api/post/follow/${userId}/`,body,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    if (response.status === 200) {
      console.log('Follow toggled successfully');
      if (fetchData) {
        fetchData(); 
      }
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default followUserApi;
