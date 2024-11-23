// Import styles and libraries
import '../../../App.scss';
import React, { useEffect, useState } from 'react';
// Import redux and slices
import { useSelector, useDispatch } from 'react-redux';
import { editTaskThunk } from '../taskSlice';
// Import components
import { useHandleDate } from '../hooks/dateManager';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const EditTaskForm = ({task, onCloseModals, onSave}) => {
    // REDUX
    const dispatch = useDispatch();
    const { users: reduxUsers } = useSelector((state) => state.user);
    // State for loading and error handling
    const [errorMessage, setErrorMessage] = useState('');

    // States for handling tasks
    const taskId = task._id;

    // Set formData when task is updated
    const [formData, setFormData] = useState({
        client: {
            _id: task.client?._id || '',
            name: task.client?.name || '',
            company: task.client?.company || '',
        },
        dateStart: task.dateStart || '',
        dateEnd: task.dateEnd || '',
        description: task.description || '',
        _id: task._id,
    });
    // Sync formData with task data
    useEffect(() => {
        setFormData({
            client: {
                _id: task.client?._id || '',
                name: task.client?.name || '',
                company: task.client?.company || '',
            },
            dateStart: task.dateStart || '',
            dateEnd: task.dateEnd || '',
            description: task.description || '',
            _id: task._id,
        });
    }, [task]);

    // Get Updated name or company from reduxUsers
    const getClient = (clientId, key) => {
        const client = reduxUsers.find((user) => user._id === clientId);
        return key === 'name' && client
            ? client.name
            :key === 'company' && client
            ? client.company
            :key === 'client' && client
            ? `${client.name} - ${client.company}`
            : 'Unknown Client'
    };

    // HandleDate custom hook from dateManager
    const { handleDate } = (useHandleDate(setFormData));

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Check is client dropdown is being modified
        if (name === "client._id") {
            // Update selectedClient separately for the dropdown
            const selectedClient = reduxUsers.find(user => user._id === value);
            // Update formData with the selected client and their company
            setFormData((prevState) => ({
                ...prevState,
                client: {
                    _id: selectedClient?._id || "",
                    name: selectedClient?.name || "",
                    company: selectedClient?.company || "",
                },
            }));
        }
        else {
            // Update formData without overwriting selectedClient
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // Handle submit #### TODO: create a Thunk to edit tasks, so I can reuse it in dateManager
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        // Filter unchanged fields
        const updatedFields = Object.keys(formData).reduce((acc, key) => {
            if (key === 'client') {
                const clientKeys = ['name', 'company', '_id'];
                const clientChanged = clientKeys.some(clientKey => formData.client[clientKey] !== task.client[clientKey]);
                if (clientChanged) acc[key] = formData[key];
            } else if (formData[key] !== task[key]) {
                acc[key] = formData[key];
            }
            return acc;
        }, {});
        // Avoid dispatch if no changes are made
        if (Object.keys(updatedFields).length === 0) {
            setErrorMessage('No changes detected');
            console.log(errorMessage);
            return;
        }
        // Include the task ID
        const filteredFormData = {
            _id: taskId,
            client: {
                name: formData.client.name,
                _id: formData.client._id,
            },
            ...updatedFields
        };
        // Dispatch the editTaskThunk
        try {
            const response = await dispatch(editTaskThunk(filteredFormData)).unwrap();
            onSave(response.result);
        } catch (error) {
            setErrorMessage(error || 'Failed to update task.');
        }
    };

    return (
        <div className="modal-overlay">
                <form className="form-container" onSubmit={handleSubmit}>
                    <header className="form-header">
                        <h2>Edit Task</h2>
                        <button className="button" type="button" onClick={onCloseModals}>
                            <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                        </button>
                    </header>
                    <div className='form-body'>
                        <div className='form-group'>
                            <div className='form-field'>
                                <label>Client:</label>
                                <select
                                    name="client._id"
                                    value={ formData.client._id || '' }
                                    onChange={handleChange}
                                >
                                    <option value={ formData.client._id || '' }>{getClient(formData.client._id, 'name')}</option>
                                    {reduxUsers.map((client) => (
                                        <option key={client._id} value={client._id}>
                                            {client.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-field'>
                                <label>Company:</label>
                                <input
                                    disabled
                                    type="text"
                                    name="company"
                                    value={getClient(formData.client._id, 'company')}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="dateStart">Start Date</label>
                                <input
                                    type="text"
                                    name="dateStart"
                                    value={formData.dateStart}
                                    onChange={handleChange}
                                />
                                <button type="button" onClick={() => handleDate('dateStart')}>START</button>
                            </div>
                            <div className="form-field">
                                <label htmlFor="dateEnd">End Date</label>
                                <input
                                    type="text"
                                    name="dateEnd"
                                    value={formData.dateEnd}
                                    onChange={handleChange}
                                />
                                <button type="button" onClick={() => handleDate('dateEnd')}>END</button>
                            </div>
                            <div className='form-field'>
                                <label>Description:</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <footer className='form-footer'>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button className="button" type="submit">Update Task</button>
                    </footer>
                </form>
        </div>
    );
};

export default EditTaskForm