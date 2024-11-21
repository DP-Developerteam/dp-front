//Import api.js
import api from '../api';
// Add tasks path for the API
const API_URL = '/tasks';

// ALL TASKS - Function to get all tasks
export const getTasks = async (userToken) => {
    try {
        // Make an API call to fetch all tasks
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
        console.error('Error fetching tasks:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

export const createTask = async (taskData, userToken) => {
    try {
        // Send a POST request to the '/create' endpoint with task data to create a new task
        const response = await api.post(`${API_URL}/create`, taskData, {
            headers: {
                // Include the token in the header
                Authorization: `Bearer ${userToken}`
            }
        });
        // Return the response data
        return response.data;
    } catch (error) {
        // Log an error to the console if the create task process fails
        console.error('Error creating task:', error);
        // Re-throw the error so it can be handled by the caller
        throw error;
    }
};

export const editTask = async (taskData, userToken) => {
    console.log("### -> EDIT-TASK api call");
    // Extract taskId from the taskData object
    const taskId = taskData._id;
    try {
        // Make a PUT request to update task details
        const response = await api.put(`${API_URL}/edit/${taskId}`, taskData, {
            // Include the token in the header for authorization
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        });
        // Return data from the edited task
        return response.data;
    } catch (error) {
        // Log the error in case of failure and throw it to be handled later
        console.error('Error editing task:', error);
        throw error;
    }
};

export const deleteTask = async (taskId, userToken) => {
    try {
        // Make a DELETE request to remove the task by ID
        const response = await api.delete(`${API_URL}/delete/${taskId}`, {
            // Include the token in the header for authorization
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        });
        // Return data from the deleted task
        return response.data;
    } catch (error) {
        // Log the error in case of failure and throw it to be handled later
        console.error('Error deleting task:', error);
        throw error;
    }
};