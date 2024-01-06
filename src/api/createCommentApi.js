import axios from 'axios';
import { BASE_URL } from '../config'

const createCommentApi = async (postId, content) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('body', content);

    const response = await axios.post(`${BASE_URL}/api/post/${postId}/comment/`, formData, {
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

export default createCommentApi;

