// Import styles and libraries
import '../../../App.scss';
import React, { useState } from 'react';
//Import functions
import { signupUser } from '../userService';
// Access user token from Redux
import { useSelector } from 'react-redux';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';


const SignUpForm = ({onCloseModals, onSave}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        company: '',
        role: 'client'
    });
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useSelector((state) => state.user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            // Directly calling signupUser
            const response = await signupUser(formData, token);
            // Assuming the successful response has a specific structure, e.g. a message or user object
            if (response && response.message) { // Check if response has a message property
                console.log("response signup: ", response);
                const createdUser = response.result;
                console.log("createdUser signup: ", createdUser);
                onSave(createdUser);
            }
        } catch (error) {
            console.error('Signup error:', error); // Log the full error for debugging
            const message = error.response?.data?.message || 'An error occurred during sign up.';
            setErrorMessage(message);
        }
    };


    return (
        <div className="modal-overlay">
            <form className="formContainer" onSubmit={handleSubmit}>
                <header className="formHeader">
                    <h2>Register user</h2>
                    <button className="button" type="button" onClick={onCloseModals}>
                        <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                    </button>
                </header>
                <div className='formBody'>
                    <div className='formGroup'>
                        <div className='form-field'>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>Email:</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <label>Company:</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
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
                </div>
                <footer className='formFooter'>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className="button" type="submit">Sign Up</button>
                </footer>
            </form>
        </div>
    );
};

export default SignUpForm;
