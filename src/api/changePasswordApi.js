import axios from 'axios';
import {BASE_URL} from '../config';

const changePasswordApi = async (oldPassword, password) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const formData = new FormData();
    if (oldPassword) formData.append('old_password', oldPassword);
    if (password) formData.append('new_password', password);


    const response = await axios.put(`${BASE_URL}/api/users/change-password/`, formData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      console.log('Post updated successfully');
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default changePasswordApi;
