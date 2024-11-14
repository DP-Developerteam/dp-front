import '../../../App.scss';
import React, { useState } from 'react';
//Import functions
import { deleteUser } from '../userService';
// Access user token from Redux
import { useSelector } from 'react-redux';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';


function DeleteUserForm({ user, onCloseModals, onSave }) {
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useSelector((state) => state.user);;
    const userId = user._id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            // Attempt to delete the user from the database using their userId and token
            const response = await deleteUser(userId, token);
            if (response) { // Check if response has a message property
                onSave(userId);
            }
        } catch (error) {
            const message = error.response?.data?.message || 'An error occurred during sign up.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="formContainer">
                <header className="formHeader">
                    <h2>Delete user</h2>
                    <button className="button" type="button" onClick={onCloseModals}>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                    </button>
                </header>
                <div className='formBody'>
                    <div className='formGroup'>
                        <div className='form-field'>
                            <p>Are you sure you want to delete the following user?</p>
                        </div>
                        <div className='form-field'>
                            <label>User ID:</label>
                            <input type="text" value={user._id} readOnly={true} />
                        </div>
                        <div className='form-field'>
                            <label>User name:</label>
                            <input type="text" value={user.name} readOnly={true} />
                        </div>
                        <div className='form-field'>
                            <label>User company:</label>
                            <input type="text" value={user.company} readOnly={true} />
                        </div>
                    </div>
                </div>
                <footer className='formFooter'>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className="button" onClick={handleSubmit}>Confirm Delete</button>
                    <button className="button" onClick={onCloseModals}>Cancel</button>
                </footer>
            </div>
        </div>
    );
}

export default DeleteUserForm;
