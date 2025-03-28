import axios from 'axios';
import { API_KEY, BASE_URL, RAPIDAPI_HOST } from '~/env';
// import { LogoutUser } from '~/redux/actions/auth-actions';
import store from '~/redux/store';
import Alertify from '~/services/alertify-services';

// Create an axios instance with the base URL
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
    },
});

// Request interceptor to add the authorization token
api.interceptors.request.use(
    async (config) => {
        // const token = store.getState().auth_store.token;
        const token = ' ';
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            // store.dispatch(LogoutUser());
            Alertify.error('Your session is expired');
            // window.location.href = '/signin';
        }
        return Promise.reject(error?.response?.data);
    }
);

// Centralized error handling function
export function handleApiError(error, rejectWithValue) {
    console.error(error);
    Alertify.error(error?.message?.[0] || 'An error occurred');
    return rejectWithValue(error);
}

// Helper function to handle API requests
const handleApiRequest = async (
    method,
    path,
    data = {},
    headers = {},
    cancelToken
) => {
    try {
        const response = await api({
            method,
            url: path,
            data,
            headers: {
                Accept: 'application/json',
                'ngrok-skip-browser-warning': '69420',
                ...headers,
            },
            cancelToken,
        });
        return response;
    } catch (error) {
        console.error(`API ${method.toUpperCase()} error:`, error);
        throw error;
    }
};

// Exported API functions
export const postApi = (path, data, headers, cancelToken) =>
    handleApiRequest('post', path, data, headers, cancelToken);

export const getApi = (path, headers, cancelToken) =>
    handleApiRequest('get', path, {}, headers, cancelToken);

export const patchApi = (path, data, headers) =>
    handleApiRequest('patch', path, data, headers);

export const putApi = (path, data, headers) =>
    handleApiRequest('put', path, data, headers);

export const deleteApi = (path, data, headers, cancelToken) =>
    handleApiRequest('delete', path, {}, headers, cancelToken);
