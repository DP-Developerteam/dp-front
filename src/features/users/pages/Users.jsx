// Import styles and libraries
// import '../../../App.scss'; -> it's imported in users.scss
import '../users.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Import the function to fetch users
import { getUsers } from '../userService';
// Import components
import FilterUserBar from '../components/FilterUserBar';
import DeleteUserForm from '../components/DeleteUserForm';
import EditUserForm from '../components/EditUserForm';
import SignUpForm from '../components/SignUpForm';
import Notifications from '../../../components/Notifications';
// Import assets
import iconDelete from '../../../assets/img/icon-delete.svg';
import iconEdit from '../../../assets/img/icon-edit.svg';
import iconAdd from '../../../assets/img/icon-add.svg';

const Users = () => {
    // Array to store and filter user data
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    // State for loading and error handling
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    // Access user token from Redux
    const { token } = useSelector((state) => state.user);
    // States for modals and selected user
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    // States for notifications
    const [notificationModal, setNotificationModal] = useState(false);
    const [notificationType, setNotificationType] = useState('');


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

    // DELETE. Selected user and show delete modal
    const selectUserDelete = (user) => {
        setSelectedUser(user);
        setDeleteModal(true);
    };

    // EDIT. Set the selected user and show edit modal
    const selectUserEdit = (user) => {
        setSelectedUser(user);
        setEditModal(true);
    };

    // CREATE. Show create modal
    const createUser = () => {
        setCreateModal(true);
    };

    // NOTIFICATION. Show create modal
    const notification = (type) => {
        setNotificationType(type);
        setNotificationModal(true);
    };
    // Close Notification
    const closeNotification = () => {
        setNotificationModal(false);
    }

    // Close  all modals
    const closeModals = () => {
        // Set all states to false. Add here all modals/states created in the file
        setDeleteModal(false);
        setEditModal(false);
        setCreateModal(false);
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
                <button className="button" onClick={() => createUser()}>
                    Create user <img className='icon' src={iconAdd} alt='delete icon' width='20px' height='20px'/>
                </button>
            </div>
            <div className='filter-bar-container'>
                <FilterUserBar allUsers={allUsers} setUsers={setUsers} />
            </div>
            {users.length > 0 ? (
                <ul className='items-container'>
                    {users.map((user) => (
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

            {notificationModal && (
                <Notifications
                    type={notificationType}
                    onCloseNotification={closeNotification}
                />
            )}
            {createModal && (
                <SignUpForm
                    onCloseModals={closeModals}
                    onSave={(createdUser) => {
                        setAllUsers((prevUsers) => [...prevUsers, createdUser]);
                        closeModals();
                        notification('create');
                    }}
                />
            )}
            {deleteModal && selectedUser && (
                <DeleteUserForm
                    user={selectedUser}
                    onCloseModals={closeModals}
                    onSave={(userId) => {
                        setAllUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
                        closeModals();
                        notification('delete');
                    }}
                    />
                )}
            {editModal && selectedUser && (
                <EditUserForm
                user={selectedUser}
                onCloseModals={closeModals}
                onSave={(updatedUser) => {
                        setAllUsers(prevUsers => prevUsers.map(user => user._id === updatedUser._id ? updatedUser : user));
                        closeModals();
                        notification('edit');
                    }}
                />
            )}
        </div>
    );
};

export default Users;