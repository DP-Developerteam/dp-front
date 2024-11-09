// Import styles and libraries
import '../../../App.scss';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to access the userId
import { useDispatch, useSelector } from 'react-redux';
//Import functions
import { userByIdThunk } from '../userSlice';
import { editUser } from '../userService';

const EditUserForm = () => {
    // Get the user ID from the URL
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, currentUser } = useSelector((state) => state.user); // Get token and current user
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        password: '',
        role: '',
        comments: []
    });
    const [createComment, setCreateComment] = useState('');
    const [editingComment, setEditingComment] = useState(null); // Índice del comentario que estamos editando
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    // Fetch user details when the component mounts
    useEffect(() => {
        if (id && token) {
            dispatch(userByIdThunk({ userId: id, token })); // Fetch user by ID
        }
    }, [dispatch, id, token]);

    // Set formData when currentUser is updated
    useEffect(() => {
        if (currentUser) {
            setFormData({
                userId: currentUser._id || '',
                name: currentUser.name || '',
                company: currentUser.company || '',
                email: currentUser.email || '',
                password: '',
                role: currentUser.role || '',
                comments: currentUser.comments || [],
            });
        }
    }, [currentUser]);

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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Create a new object that omits empty fields
        const filteredFormData = {
            ...formData,
            comments: formData.comments.filter(comment => comment.trim() !== '') // Filtrar comentarios vacíos
        };

        try {
            // Call the editUser service
            await editUser(filteredFormData, token);
            setSuccessMessage('User updated successfully!');
            navigate('/users'); // Navigate back to users
        } catch (error) {
            // Log and set errror message
            console.error('Error updating user:', error);
            const message = error.response?.data?.message || 'An error occurred during sign up.';
            setErrorMessage(message);
        }
    };

    return (
        <div>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form className='formContainer' onSubmit={handleSubmit}>
                <header className='formHeader'>
                    <h2>Edit User</h2>
                    <p>Cancel</p>
                </header>
                <div className='formBody'>

                    <div className='formGroup'>
                        <div className='formField'>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='formField'>
                            <label>Company:</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='formField'>
                            <label>Email:</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='formField'>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='formField'>
                            <label>Role:</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="client">Client</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>
                    </div>
                    <div className='formGroup'>
                        <div className='formField'>
                            <label>Comments:</label>
                            <div className='commentsContainer'>
                                <input
                                    type="text"
                                    value={createComment}
                                    onChange={handleCommentChange}
                                />
                                <button className='buttonIcon' type="button" onClick={editingComment !== null ? saveEditedComment : addComment}>
                                    {editingComment !== null ? 'Update' : 'Create'}
                                </button>
                            </div>
                            <ul className='commentsList'>
                                {formData.comments.map((comment, index) => (
                                    <li key={index} className='commentsContainer'>
                                        {comment}
                                        <div className='buttonsContainer'>
                                            <button type="button" onClick={() => editComment(index)}>Edit</button>
                                            <button type="button" onClick={() => removeComment(index)}>Remove</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <footer className='formFooter'>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className='button' type="submit">Update User</button>
                </footer>
            </form>
        </div>
    );
};

export default EditUserForm;
