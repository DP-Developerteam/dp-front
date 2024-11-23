// Import styles and libraries
// import '../../../App.scss'; -> it's imported in users.scss
import '../users.scss';
import React, { useEffect, useState } from 'react';
// Import redux and slices
import { useSelector, useDispatch } from 'react-redux';
import { getUsersThunk, addUser, updateUser, deleteUser } from '../userSlice';
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
    // REDUX
    const dispatch = useDispatch();
    const { users: reduxUsers, token, errorMessage } = useSelector((state) => state.user);
    // Array to store and filter user data
    const [usersList, setUsersList] = useState([]);
    const [usersFilterList, setUsersFilterList] = useState([]);
    // States for modals and selected user
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    // States for notifications
    const [notificationModal, setNotificationModal] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    // Fetch users when the component mounts
    useEffect(() => {
        dispatch(getUsersThunk(token));
    }, [dispatch, token]);
    // Update local users when Redux users change
    useEffect(() => {
        setUsersList(reduxUsers || []);
        setUsersFilterList(reduxUsers || []);
    }, [reduxUsers]);

    // Handle modal/notifications states
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

    // Display error message if fetching failed
    if (errorMessage) return <div>{errorMessage}</div>;

    // Render the list of users or a message if no users are found
    return (
        <div className='users-page crud-page'>
            <div className='title-container'>
                <h1 className='title'>Users</h1>
                <button className="button" onClick={() => createUser()}>
                    Create user <img className='icon' src={iconAdd} alt='delete icon' width='20px' height='20px'/>
                </button>
            </div>
            <div className='filter-bar-container'>
                <FilterUserBar setUsersFilterList={setUsersFilterList} usersList={usersList} />
            </div>
            {!reduxUsers || !reduxUsers ? (
                <div>Loading data...</div>
            ) : (
                <>
                    {/* No Tasks Found */}
                    {usersFilterList.length === 0 ? (
                        <p>No tasks found.</p>
                    ) : (
                        <ul className='items-container'>
                            {usersFilterList.map((user) => (
                                <li key={`user-${user._id}`} className='item'>
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
                    )}
                </>
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
                        setUsersList((prevUsers) => [...prevUsers, createdUser]);
                        closeModals();
                        notification('user-create');
                        dispatch(addUser(createdUser));
                    }}
                />
            )}
            {deleteModal && selectedUser && (
                <DeleteUserForm
                    user={selectedUser}
                    onCloseModals={closeModals}
                    onSave={(deletedUser) => {
                        setUsersList((prevUsers) => prevUsers.filter(user => user._id !== deletedUser._id));
                        closeModals();
                        notification('user-delete');
                        dispatch(deleteUser(deletedUser));
                    }}
                    />
                )}
            {editModal && selectedUser && (
                <EditUserForm
                user={selectedUser}
                onCloseModals={closeModals}
                onSave={(updatedUser) => {
                        setUsersList(prevUsers => prevUsers.map(user => user._id === updatedUser._id ? updatedUser : user));
                        closeModals();
                        notification('user-edit');
                        dispatch(updateUser(updatedUser));
                    }}
                />
            )}
        </div>
    );
};

export default Users;