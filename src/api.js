import axios from 'axios';


  // const url = 'http://localhost:9000';

  // const url = 'https://map-chatr.herokuapp.com';


const api = axios.create({
  baseURL: 'https://map-chatr.herokuapp.com',
})

export default api;
