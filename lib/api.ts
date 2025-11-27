import axios from 'axios';

const pokeurl = process.env.NEXT_PUBLIC_POKEAPI_URL;

const api = axios.create({
  baseURL: pokeurl,
  headers: {
    Accept: 'application/json',
  },
  timeout: 10000,
});

export default api;
