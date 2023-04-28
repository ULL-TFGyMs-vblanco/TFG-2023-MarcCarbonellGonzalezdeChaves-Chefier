import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://chefier-backend-git-develop-tfg-marccarbonell.vercel.app/api',
});

export default instance;
