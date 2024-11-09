// Import styles and libraries
import '../../../App.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// Import the function to fetch users
import { getUsers, deleteUser } from '../userService';

const AllUsers = () => {
    // Array to store user data
    const [users, setUsers] = useState([]);
    // Boolean to indicate loading state
    const [loading, setLoading] = useState(true);
    // String to hold error messages
    // const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    // Access user role from Redux
    const { token } = useSelector((state) => state.user);

    // useEffect hook to fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Call the getUsers function to retrieve user data
                const usersData = await getUsers(token);
                // Update the users state with the fetched data
                setUsers(usersData);
            } catch (error) {
                // Set the error state with a relevant message, falling back to a default
                setErrorMessage(error.response?.data.message || "Failed to load users.");
            } finally {
                // Set loading to false after the fetch attempt (successful or failed)
                setLoading(false);
            }
        };
        // Invoke the fetchUsers function to initiate data fetching
        fetchUsers();
    }, [token]);

    const handleDeleteUser = async (userId) => {
        // *** ToDos ------> Create a popup to confirm delete user.
        try {
            const deletedUser = await deleteUser(userId, token);
            // Update the users state to reflect the deletion
            setUsers((prevUsers) => prevUsers.filter(user => user._id !== deletedUser._id));
        } catch (error) {
                // Set the error state with a relevant message, falling back to a default
            setErrorMessage(error.response?.data?.message || 'Failed to delete users.');
        }
    };

    // Conditional rendering based on loading and error states
    // Show loading message while data is being fetched
    if (loading) return <div>Loading...</div>;
    // Display error message if fetching failed
    if (errorMessage) return <div>{errorMessage}</div>;

    // Render the list of users or a message if no users are found
    return (
        <div>
            <h1>All Users</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <p>*********</p>
                            <p>{user.name} - {user.lastName}</p>
                            <p>{user.role}</p>
                            <p><button onClick={() => handleDeleteUser(user._id)}>Delete</button></p>
                            <p><NavLink to={`/users/edit/${user._id}`}>Edit</NavLink></p>
                            <p>***</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default AllUsers;
