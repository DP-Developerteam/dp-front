// Import styles and libraries
import '../../../App.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Import service
import { editUser } from '../userService';
// Import assets
import iconAdd from '../../../assets/img/icon-add.svg';
import iconClose from '../../../assets/img/icon-close.svg';
import iconDelete from '../../../assets/img/icon-delete.svg';
import iconEdit from '../../../assets/img/icon-edit.svg';

const EditUserForm = ({ user, onCloseModals, onSave }) => {
    const { token, userId } = useSelector((state) => state.user); // Get token and user id
    // Set formData when user is updated
    const [formData, setFormData] = useState({
        name: user.name || '',
        company: user.company || '',
        email: user.email || '',
        password: '',
        role: user.role || '',
        comments: user.comments || [],
    });

    const [createComment, setCreateComment] = useState('');
    const [editingComment, setEditingComment] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    // Set formData with user data
    useEffect(() => {
        setFormData({
            name: user.name || '',
            company: user.company || '',
            email: user.email || '',
            password: '',
            role: user.role || '',
            comments: user.comments || [],
        });
    }, [user]);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle new comment input
    const handleCommentChange = (e) => {
        setCreateComment(e.target.value);
    };

    // Add a new comment to the comments array
    const addComment = () => {
        if (createComment.trim()) {
            setFormData({
                ...formData,
                comments: [...formData.comments, createComment]
            });
            // Limpiar el campo después de agregar el comentario
            setCreateComment('');
        } else {
            console.log("No comment to add"); // Debugging: No hay comentario
        }
    };

    // Start editing a comment
    const editComment = (index) => {
        setEditingComment(index);
        setCreateComment(formData.comments[index]);
    };

    // Save the edited comment
    const saveEditedComment = () => {
        if (createComment.trim()) {
            const updatedComments = [...formData.comments];
            updatedComments[editingComment] = createComment; // Reemplazamos el comentario editado
            setFormData({
                ...formData,
                comments: updatedComments
            });
            setCreateComment('');
            setEditingComment(null); // Restablecemos el estado de edición
        } else {
            console.log("No comment to save");
        }
    };

    // Remove a comment by its index
    const removeComment = (index) => {
        setFormData({
            ...formData,
            comments: formData.comments.filter((_, i) => i !== index)
        });
    };

    // Handle commits
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Creamos una copia de los datos del usuario actual
        const filteredFormData = {
            _id: userId,  // Mantener el ID del usuario
            ...user,  // Copiar los datos actuales del usuario
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
        if (JSON.stringify(filteredFormData) === JSON.stringify(user)) {
            return;  // No hacemos la solicitud si no hay cambios
        }

        try {
            // Directly calling editUser
            const response = await editUser(filteredFormData, token);
            // Check response
            if (response && response.message) {
                const editedUser = response.result;
                setSuccessMessage(response.message);
                onSave(editedUser);
            }
            // onSave(filteredFormData);
        } catch (error) {
            console.error('Error updating user:', error);
            const message = error.response?.data?.message || 'An error occurred while updating the user.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="modal-overlay">
                <form className="form-container" onSubmit={handleSubmit}>
                    <header className="form-header">
                        <h2>Edit User</h2>
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
                                <label>Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-field'>
                                <label>Role:</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="client">Client</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='form-field'>
                                <label>Comments:</label>
                                <div className='comments-container'>
                                    <input
                                        type="text"
                                        value={createComment}
                                        onChange={handleCommentChange}
                                    />
                                    <button className='button-icon' type="button" onClick={editingComment !== null ? saveEditedComment : addComment}>
                                        {editingComment !== null ? 'Update' : <img className='icon' src={iconAdd} alt='delete icon' width='20px' height='20px'/>}
                                    </button>
                                </div>
                                <ul className='comments-list'>
                                    {formData.comments.map((comment, index) => (
                                        <li key={index} className='comments-container'>
                                            {comment}
                                            <div className='buttons-container'>
                                                <button className='button-icon' type="button" onClick={() => editComment(index)}>
                                                    <img className='icon' src={iconEdit} alt='delete icon' width='20px' height='20px'/>
                                                </button>
                                                <button className='button-icon' type="button" onClick={() => removeComment(index)}>
                                                    <img className='icon' src={iconDelete} alt='delete icon' width='20px' height='20px'/>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <footer className='form-footer'>
                        {successMessage && <p className="error-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button className="button" type="submit">Update User</button>
                    </footer>
                </form>
        </div>
    );
};

export default EditUserForm;
