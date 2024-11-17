// Import styles and libraries
import '../../../App.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Import service
import { editTask } from '../taskService';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

const EditTaskForm = ({task, onCloseModals, onSave}) => {
    const { token } = useSelector((state) => state.user); // Get token and task id
    const taskId = task._id;
    // Set formData when task is updated
    const [formData, setFormData] = useState({
        name: task.client.name || '',
        company: task.client.company || '',
        dateStart: task.dateStart || '',
        dateEnd: task.dateEnd || '',
        description: task.description || '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    // Set formData with task data
    useEffect(() => {
        setFormData({
            name: task.client.name || '',
            company: task.client.company || '',
            dateStart: task.dateStart || '',
            dateEnd: task.dateEnd || '',
            description: task.description || '',
        });
    }, [task]);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle commits
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Creamos una copia de los datos del usuario actual
        const filteredFormData = {
            _id: taskId,  // Mantener el ID del usuario
            ...task,  // Copiar los datos actuales del usuario
        };

        // Iteramos sobre los campos del formulario y solo agregamos los que no están vacíos
        Object.keys(formData).forEach((key) => {
            const value = formData[key];

            // Verificamos que el valor sea una cadena antes de usar trim()
            if (typeof value === 'string' && value.trim() !== '') {
                // Si el campo es contraseña y no se ha modificado, no lo agregamos
                if (key === 'password' && value.trim() === '') {
                    return;  // No incluir la contraseña si está vacía
                }
                filteredFormData[key] = value.trim();
            } else if (Array.isArray(value) && value.length > 0) {
                // Si el campo es un array, lo agregamos solo si no está vacío
                filteredFormData[key] = value;
            } else if (value !== undefined && value !== null) {
                // Si el valor no es vacío, undefined o null, lo agregamos tal cual
                filteredFormData[key] = value;
            }
        });

        // Si no hay cambios en los datos, no enviamos la solicitud
        if (JSON.stringify(filteredFormData) === JSON.stringify(task)) {
            return;  // No hacemos la solicitud si no hay cambios
        }

        try {
            // Directly calling editTask
            const response = await editTask(filteredFormData, token);
            // Check response
            if (response && response.message) {
                const editedTask = response.result;
                setSuccessMessage(response.message);
                onSave(editedTask);
            }
            // onSave(filteredFormData);
        } catch (error) {
            console.error('Error updating task:', error);
            const message = error.response?.data?.message || 'An error occurred while updating the task.';
            setErrorMessage(message);
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
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label>Company:</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label>Date start:</label>
                                <input
                                    type="text"
                                    name="dateStart"
                                    value={formData.dateStart}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label>Date end:</label>
                                <input
                                    type="text"
                                    name="dateEnd"
                                    value={formData.dateEnd}
                                    onChange={handleChange}
                                />
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
                        {successMessage && <p className="error-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button className="button" type="submit">Update Task</button>
                    </footer>
                </form>
        </div>
    );
};

export default EditTaskForm