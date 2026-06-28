import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com'; // dummy API

export const createRequest = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/posts`, data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getRequests = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/posts`);
    return res.data.slice(0, 10).map(item => ({
      title: item.title,
      status: 'Pending'
    }));
  } catch (err) {
    return [];
  }
};
