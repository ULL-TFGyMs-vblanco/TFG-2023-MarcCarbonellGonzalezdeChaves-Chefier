import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://chefier-backend-git-feat-recipes-tfg-marccarbonell.vercel.app/api',
});

export default instance;
