import axios from 'axios';
import {BASE_URL} from '../config';

const notificationsSeenApi = async (notificationId) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    let body = {}

    const response = await axios.post(`${BASE_URL}/api/post/notifications-seen/${notificationId}/`, body, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
        return response.data
    } else {
      return response.error
    }
  } catch (error) {
    return error
  }
};

export default notificationsSeenApi;
