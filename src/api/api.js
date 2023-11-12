import axios from 'axios';

const KEY_API = '39778143-5903b31245878590f4fb837ac';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getImages(searchValue, page) {
  try {
    const response = await axios.get('', {
      params: {
        key: KEY_API,
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

const api = {
  getImages,
};

export default api;
