// Importing createSlice from Redux Toolkit to create a slice of the Redux store
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import the signin function from the taskService
// import { signinUser, getUserById } from './taskService';
// Imports Auth Bearing for Axios
import { setAuthToken } from '../api';

// Creating a slice for task data management
const taskSlice = createSlice({
    // Name of the slice, used for action types and state
    name: 'task',
    // Initial state for the task slice
    initialState: {
        taskId: null, // ID of the task, initially set to null
    },
    // Reducers for managing task state
    reducers: {
        // Action to set the task data in the state
        setTask: (state, action) => {
            // Updating the state with taskId from the action payload
            state.taskId = action.payload.taskId;
            // Set token in Axios using api.js
            setAuthToken(action.payload.token);
        },
        // Action to clear task data from the state
        clearTask: (state) => {
            // Resetting the task state to initial values
            state.taskId = null;
            // Clear token in Axios using api.js
            setAuthToken(null);
        },
    },
    // Handle async actions in extraReducers
    extraReducers: (builder) => {
        // builder
            // .addCase(signInThunk.fulfilled, (state, action) => {
            //     // Use action.payload to set the task state
            //     const { _id } = action.payload;
            //     state.taskId = _id;
            //     state.error = null; // Clear error
            // })
            // .addCase(signInThunk.rejected, (state, action) => {
            //     state.error = action.error.message;
            // })
            // .addCase(userByIdThunk.fulfilled, (state, action) => {
            //     state.currentUser = action.payload; // Ensure user is saved here
            // })
            // .addCase(userByIdThunk.rejected, (state, action) => {
            //     state.error = action.error.message;
            // });
    }
});

// Exporting the actions to be used in components
export const { setTask, clearTask } = taskSlice.actions;
// Exporting the reducer to be used in the store
export default taskSlice.reducer;