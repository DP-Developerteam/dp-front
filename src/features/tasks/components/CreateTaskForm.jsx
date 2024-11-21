// Import styles and libraries
import '../../../App.scss';
import React, { useState } from 'react';
// Import redux and slices
import { useSelector } from 'react-redux';
//Import functions
import { createTask } from '../taskService';
// Import components
import { useHandleDate } from './useHandleDate';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const CreateTaskForm = ({onCloseModals, onSave}) => {
    // REDUX
        const { users: reduxUsers, token } = useSelector((state) => state.user);
    // State formData
    const [formData, setFormData] = useState({
        client: {},
        dateStart: '',
        dateEnd: '',
        description: ''
    });
    // Array to store and select user data
    const [selectedClient, setSelectedClient] = useState('');
    // HandleDate custom hook
    const { handleDate } = useHandleDate(setFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update selectedClient separately for the dropdown
        if (name === "client") {
            setSelectedClient(value);
        }
        // Update formData without overwriting selectedClient
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrorMessage('');
        try {
            // Directly calling signupUser
            const response = await createTask(formData, token);
            // Check response
            if (response && response.message) {
                const createdTask = response.result;
                //Add comments
                const clientName = reduxUsers.find(user => user._id === createdTask.client);
                if (clientName) {
                    createdTask.client = {
                        _id: clientName._id,
                        name: clientName.name,
                        company: clientName.company,
                    };
                }
                // setSuccessMessage(response.message);
                onSave(createdTask);
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div className='modal-overlay'>
            <form className='form-container' onSubmit={handleSubmit}>
                <header className='form-header'>
                    <h2>Create task</h2>
                    <button className='button' type='button' onClick={onCloseModals}>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                    </button>
                </header>
                <div className='form-body'>
                    <div className='form-group'>
                        <div className='form-field'>
                            <label>Client:</label>
                            <select
                                name='client'
                                value={selectedClient}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select a client</option>
                                {reduxUsers.map((client) => (
                                    <option key={client._id} value={client._id}>{client.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-field'>
                            <label>Date start:</label>
                            <input
                                type='text'
                                name='dateStart'
                                value={formData.dateStart}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" onClick={() => handleDate('dateStart')}>START</button>
                        </div>
                        <div className='form-field'>
                            <label>Date end:</label>
                            <input
                                type='text'
                                name='dateEnd'
                                value={formData.dateEnd}
                                onChange={handleChange}
                            />
                            <button type="button" onClick={() => handleDate('dateEnd')}>END</button>
                        </div>
                        <div className='form-field'>
                            <label>Description:</label>
                            <input
                                type='text'
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <footer className='form-footer'>
                    <button className='button' type='submit'>Create task</button>
                </footer>
            </form>
        </div>
    )
}

export default CreateTaskForm