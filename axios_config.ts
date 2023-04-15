import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.6.131.120/api',
});

export default instance;
