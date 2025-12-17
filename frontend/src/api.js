
import axios from 'axios'
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// add an API request interceptor to check for an access token in localStorage
// and add the token to Authorization headers
// this will take two callbacks as parameters
// first callback has our config object in which we can access headers object
// second callback catches any errors and rejects them via promise (since our api requests return promises)
// always return config

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;
