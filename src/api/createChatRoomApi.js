import axios from 'axios';
import { BASE_URL } from '../config';

const createChatRoomApi = async(userId) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    let body = {}
    const response = await axios.post(`${BASE_URL}/api/chat/create-room/${userId}/`,body,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    if (response.status === 200) {
      return response.data
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default createChatRoomApi;
