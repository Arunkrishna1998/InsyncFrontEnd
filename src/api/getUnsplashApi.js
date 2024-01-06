import axios from 'axios';


const getUnsplashApi = async () => {
  try {
    const apiKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY
    const response = await axios.get(`https://api.unsplash.com/photos/`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Client-ID ${apiKey}`
      },
    });
    if  (response.status === 200) {
        return response.data;
    } else {
        console.log(response.error)
    }
  } catch (error) {
    console.error(error);
  }
};

export default getUnsplashApi;