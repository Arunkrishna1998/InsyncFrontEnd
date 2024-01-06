import axios from 'axios';
import {BASE_URL} from '../config';

const updateUserApi = async (formVal, postImage) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const formData = new FormData();
    if (formVal.first_name) formData.append('first_name', formVal.first_name);
    if (formVal.last_name) formData.append('last_name', formVal.last_name);
    if (formVal.age) formData.append('age', formVal.age);
    if (formVal.country) formData.append('country', formVal.country);
    if (formVal.education) formData.append('education', formVal.education);
    if (formVal.work) formData.append('work', formVal.work);
    if (postImage) formData.append('profile_image', postImage);

    const response = await axios.post(`${BASE_URL}/api/users/update/`, formData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return response.error;
    }
  } catch (error) {
    return error;
  }
};

export default updateUserApi;
