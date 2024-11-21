// Importing the combineReducers function from Redux to combine multiple reducers into one
import { combineReducers } from 'redux';
// Importing the userReducer which manages the user-related state from userSlice
import userReducer from '../features/users/userSlice';
// Importing the taskReducer which manages the user-related state from taskSlice
import taskReducer from '../features/tasks/taskSlice';

// Combining the userReducer into a rootReducer to manage the global state
const rootReducer = combineReducers({
    // The 'user' key will contain the state managed by userReducer
    user: userReducer,
    task: taskReducer,
    // Additional reducers can be added here in the future as the application grows
});

// Exporting the combined rootReducer to be used in the store
export default rootReducer;
