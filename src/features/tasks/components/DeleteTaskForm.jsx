import '../../../App.scss';
import React, { useState } from 'react';
//Import functions
import { deleteTask } from '../taskService';
// Access task token from Redux
import { useSelector } from 'react-redux';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const DeleteTaskForm = ({task, onCloseModals, onSave}) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useSelector((state) => state.user);;
    const taskId = task._id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            // Directly calling deleteTask
            const response = await deleteTask(taskId, token);
            // Check response
            if (response && response.message) {
                const taskId = response.result;
                setSuccessMessage(response.message);
                console.log("response message delete", response.message);
                onSave(taskId);
            }
            // TODO: I don't know why, but this refresh the tasksList
            if (response) {
                onSave(taskId);
            }
        } catch (error) {
            const message = error.response?.data?.message || 'An error occurred during sign up.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="form-container">
                <header className="form-header">
                    <h2>Delete task</h2>
                    <button className="button" type="button" onClick={onCloseModals}>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                    </button>
                </header>
                <div className='form-body'>
                    <div className='form-group'>
                        <div className='form-field'>
                            <p>Are you sure you want to delete the following task?</p>
                        </div>
                        <div className='form-field'>
                            <label>Task ID:</label>
                            <input type="text" value={task._id} readOnly={true} />
                        </div>
                        <div className='form-field'>
                            <label>Task client name:</label>
                            <input type="text" value={task.client.name} readOnly={true} />
                        </div>
                        <div className='form-field'>
                            <label>Task date:</label>
                            <input type="text" value={task.dateStart} readOnly={true} />
                        </div>
                        <div className='form-field'>
                            <label>Task description:</label>
                            <input type="text" value={task.description} readOnly={true} />
                        </div>
                    </div>
                </div>
                <footer className='form-footer'>
                    {successMessage && <p className="error-message">{successMessage}</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className="button" onClick={handleSubmit}>Confirm Delete</button>
                    <button className="button" onClick={onCloseModals}>Cancel</button>
                </footer>
            </div>
        </div>
    );
}

export default DeleteTaskForm