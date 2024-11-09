// Import styles and libraries
import '../../../App.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Import functions
import { signupUser } from '../userService';


const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        company: '',
        brand: '',
        role: 'client',
        startDate: new Date(),
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            // Directly calling signupUser
            const response = await signupUser(formData);
            // Assuming the successful response has a specific structure, e.g. a message or user object
            if (response && response.message) { // Check if response has a message property
                navigate('/signin'); // Navigate on successful sign-up
            }
        } catch (error) {
            console.error('Signup error:', error); // Log the full error for debugging
            const message = error.response?.data?.message || 'An error occurred during sign up.';
            setErrorMessage(message);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Lastname:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Company:</label>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Brand:</label>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;
