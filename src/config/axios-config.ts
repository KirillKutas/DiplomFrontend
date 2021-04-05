import axios from 'axios';
import { getToken } from '../services/TokenService';

const { REACT_APP_API_URL } = process.env;

export default axios.create({
    baseURL: 'https://localhost:44396/api',
    responseType: 'json',
    headers: getToken() ? { Authorization: 'Bearer ' + getToken() } : {},
    withCredentials: true,
});
