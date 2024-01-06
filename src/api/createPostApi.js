import axios from 'axios';
import { BASE_URL } from '../config';

const createPostApi = async (content, postImage, tags) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('content', content);
    formData.append('post_img', postImage);
    formData.append('tags', tags);

    const response = await axios.post(`${BASE_URL}/api/post/create-post/`, formData, {
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

export default createPostApi;

