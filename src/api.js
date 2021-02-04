import axios from 'axios';

let url;
if(process.env.NODE_ENV === 'development'){
  url = 'http://localhost:9000';
}else{
  url = 'https://swaff-y.github.io/';
}

const api = axios.create({
  baseURL: url,
})

export default api;
