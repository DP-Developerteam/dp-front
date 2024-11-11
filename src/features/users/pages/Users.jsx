// Import styles and libraries
// import '../../../App.scss'; -> it's imported in users.scss
import '../users.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Import the function to fetch users
import { getUsers, deleteUser } from '../userService';
// Import components
import FilterUserBar from '../components/FilterUserBar';
import DeleteUserForm from '../components/DeleteUserForm';
import EditUserForm from '../components/EditUserForm';
// Import assets
import iconDelete from '../../../assets/img/icon-delete.svg';
import iconEdit from '../../../assets/img/icon-edit.svg';

const Users = () => {
    // Array to store and filter user data
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    // State for loading and error handling
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    // Access user role from Redux
    const { token } = useSelector((state) => state.user);
    // State for modals and selected user
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // useEffect hook to fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Call the getUsers function to retrieve user data
                const usersData = await getUsers(token);
                // Update the users state with the fetched data
                setUsers(usersData);
                setAllUsers(usersData);
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

    // Handle delete button click: set the selected user and show delete modal
    const selectUserDelete = (user) => {
        setSelectedUser(user);
        setDeleteModal(true);
    };

    // Function to confirm deletion of a user
    const handleConfirmDelete = async (userId) => {
        try {
            // Attempt to delete the user from the database using their userId and token
            const deletedUser = await deleteUser(userId, token);

            // Update the users state to remove the deleted user from the list
            setUsers(prevUsers => prevUsers.filter(user => user._id !== deletedUser._id));
        } catch (error) {
            // Set an error message if deletion fails, with a fallback default message
            setErrorMessage(error.response?.data?.message || 'Failed to delete user.');
        } finally {
            // Close the modal once the deletion process is completed (successful or failed)
            setDeleteModal(false);
        }
    };

    // Close the delete modal
    const closeDeleteModal = () => {
        setDeleteModal(false);
        setSelectedUser(null);
    };

    // Handle edit button click: set the selected user and show edit modal
    const selectUserEdit = (user) => {
        setSelectedUser(user);
        setEditModal(true);
    };

    // Close the edit modal
    const closeEditModal = () => {
        setEditModal(false);
        setSelectedUser(null);
    };

    // Conditional rendering based on loading and error states
    // Show loading message while data is being fetched
    if (loading) return <div>Loading...</div>;
    // Display error message if fetching failed
    if (errorMessage) return <div>{errorMessage}</div>;

    // Render the list of users or a message if no users are found
    return (
        <div className='page users-page'>
            <div className='title-container'>
                <h1 className='title'>Users</h1>
                <p>Add</p>
            </div>
            <div className='filter-bar-container'>
                <FilterUserBar allUsers={allUsers} setUsers={setUsers} />
            </div>
            {users.length > 0 ? (
                <ul className='items-container'>
                    {users.map(user => (
                        <li key={user._id} className='item'>
                            <div className='text-container'>
                                <p className='paragraph bold'>{user.name}</p>
                                <p className='paragraph'>{user.company}</p>
                            </div>
                            <div className='buttons-container'>
                                <button className='icon' onClick={() => selectUserDelete(user)}>
                                    <img className='icon' src={iconDelete} alt='delete icon' width='20px' height='20px'/>
                                </button>
                                <button className='icon' onClick={() => selectUserEdit(user)}>
                                    <img className='icon' src={iconEdit} alt='edit icon' width='20px' height='20px'/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}

            {deleteModal && selectedUser && (
                <DeleteUserForm
                    user={selectedUser}
                    onConfirm={() => handleConfirmDelete(selectedUser._id)}
                    onCancel={closeDeleteModal}
                />
            )}
            {editModal && selectedUser && (
                <EditUserForm
                    user={selectedUser}
                    onClose={closeEditModal}
                    onSave={(updatedUser) => {
                        setUsers(prevUsers => prevUsers.map(user => user._id === updatedUser._id ? updatedUser : user));
                        closeEditModal();
                    }}
                />
            )}
        </div>
    );
};

export default Users;