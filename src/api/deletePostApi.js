import axios from 'axios';
import { BASE_URL } from '../config';

const deletePostApi = async (postId, fetchData) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await axios.delete(`${BASE_URL}/api/post/delete-post/${postId}/`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      console.log('Post deleted successfully');
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

export default deletePostApi;
