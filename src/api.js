import axios from 'axios';

const api = axios.create({
  baseURL: 'https://map-chatr.herokuapp.com/',

})

export default api;
