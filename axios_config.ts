import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://chefier.vercel.app/api',
});

export default instance;
