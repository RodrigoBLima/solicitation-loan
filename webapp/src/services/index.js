import axios from 'axios';

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL:`https://django-api-loan.herokuapp.com`
});
export default api;
