import axios from 'axios';
import { BASE_URL } from '../config';

const createInterestsApi = async (selectedTags) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const requestData = { interests: selectedTags };

    const response = await axios.post(`${BASE_URL}/api/post/interests/`, requestData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default createInterestsApi;

