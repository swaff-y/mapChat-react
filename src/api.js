import axios from 'axios';


  // const url = 'http://localhost:9000';

  // const url = 'https://swaff-y.github.io/';


const api = axios.create({
  baseURL: 'https://swaff-y.github.io/mapChat-react',
})

export default api;
