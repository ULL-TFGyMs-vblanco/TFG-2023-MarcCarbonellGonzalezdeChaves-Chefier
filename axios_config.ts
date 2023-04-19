import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://chefier-backend.vercel.app/api',
});

export default instance;
