import axios from 'axios';
import { BASE_URL } from '../config';

const contactListApi = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(`${BASE_URL}/api/post/contacts/`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if  (response.status === 200) {
        return response.data;
    } else {
        console.log(response.error)
    }
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default contactListApi;