// Import Redux
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';
// Import the signin function from the taskService
import { getTasks, editTask } from './taskService';
// Imports Auth Bearing for Axios
import { setAuthToken } from '../api';

// THUNK - getTasks
export const getTasksThunk = createAsyncThunk(
    'task/getTasks',
    async (token, { rejectWithValue }) => {
        try {
            // API call to fetch users
            return await getTasks(token);
        } catch (error) {
            return rejectWithValue(
                error.response?.data.message || 'Failed to load users'
            );
        }
    }
);
// THUNK - ediTask
export const editTaskThunk = createAsyncThunk(
    'task/editTask',
    async (taskData, { getState, rejectWithValue }) => {
        // Access the Redux state
        const { token, users } = getState().user;
        try {
            // API call to update task
            const response = await editTask(taskData, token);
            // Add client data to API response
            const clientData = users.find((user) => user._id === response.result.client);
            if (clientData) {
                response.result.client = {
                    _id: clientData._id,
                    name: clientData.name,
                    company: clientData.company,
                };
            }
            // Return the updated task to be used in extraReducers
            return response;
            // return updatedTask;
        } catch (error) {
            console.error('Error editing task:', error);
            return rejectWithValue(
                error.response?.data?.message || 'Failed to edit the task.'
            );
        }
    }
);

// Creating a slice for task data management
const taskSlice = createSlice({
    // Name of the slice, used for action types and state
    name: 'task',
    // Initial state for the task slice
    initialState: {
        tasks: [],
        isLoading: false,
        error: null
    },
    // Reducers for managing task state
    reducers: {
        // Action to set the task data in the state
        setTask: (state, action) => {
            // Updating the state with taskId from the action payload
            state.taskId = action.payload.taskId;
            // Set token in Axios using api.js
            state.setAuthToken(action.payload.token);
        },
        // Action to clear task data from the state
        clearTask: (state) => {
            // Resetting the task state to initial values
            state.taskId = null;
            // Clear token in Axios using api.js
            setAuthToken(null);
        },
        // Action to update task in State
        updateTaskInState: (state, action) => {
            const updatedTask = action.payload;
            const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
            if (index >= 0) {
                // Replace with updated task
                state.tasks[index] = updatedTask;
            }
        },
    },
    // Handle async actions in extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(getTasksThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTasksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload.map((task) => ({
                    _id: task._id,
                    client: {
                        _id: task.client?._id || '',
                        name: task.client?.name || '',
                        company: task.client?.company || '',
                    },
                    dateStart: task.dateStart,
                    dateEnd: task.dateEnd,
                    description: task.description
                }));
            })
            .addCase(getTasksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(editTaskThunk.pending, (state) => {
                state.isLoading = true; // Optionally set a loading state
            })
            .addCase(editTaskThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedTask = action.payload;
                if (updatedTask) {
                    const index = state.tasks.findIndex(
                        (task) => task._id === updatedTask._id
                    );
                    if (index >= 0) {
                        state.tasks[index] = updatedTask; // Update the task in the state
                    }
                }
            })
            .addCase(editTaskThunk.rejected, (state, action) => {
                state.isLoading = false;
                // state.error = action.payload; // Store the error message
                if (action.payload === 'No changes detected') {
                    console.log('No changes detected, skipping API call');
                    // Optionally, you can set a flag or show a message
                    state.noChanges = true;
                } else {
                    state.error = action.payload || 'Failed to edit the task';
                }
            });
    }
});

// Exporting the actions to be used in components
export const { setTask, clearTask, updateTaskInState } = taskSlice.actions;
// Exporting the reducer to be used in the store
export default taskSlice.reducer;