//Import api.js
import api from '../api';
// Add users path for the API
const API_URL = '/tasks';

// ALL USERS - Function to get all users
export const getTasks = async (userToken) => {
    try {
        // Make an API call to fetch all users
        const response = await api.get(`${API_URL}/`, {
            headers: {
                // Include the token in the header
                Authorization: `Bearer ${userToken}`
            }
        });
        // Return the data received from the API
        return response.data;
    } catch (error) {
        // Log the error and throw it for further handling
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

export const createTask = async (userToken) => {

};

export const deleteTask = async (userToken) => {

};

export const editTask = async (userToken) => {

};