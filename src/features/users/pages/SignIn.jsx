// Import styles and libraries
import '../../../App.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//REDUX imports
import { useDispatch } from 'react-redux';
import { clearUser, signInThunk } from '../userSlice';



const SignInForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            // Dispatch the loginUser thunk action
            const action = await dispatch(signInThunk(formData)).unwrap();

            // Variables to manage the SignIn
            const userToken = action.token;
            const userRole = action.role;
            const expiresIn = action.expiresIn * 1000;
            // const alertExpires = expiresIn - 20; // alert pop ups when there are 20 seconds for the auto signOut

            if (userToken) {

                //Conditional to redirect based on role after login
                navigate(userRole === 'admin' ? '/users' : '/');
                // navigate('/users');

                setTimeout(() => {
                    // Redirect to homepage
                    navigate('/');
                    // Clear user when token expires
                    dispatch(clearUser());
                }, expiresIn); // Call this after the expiration time

            }

        } catch (error) {
            console.error('Sign-in error:', error); // Log the entire error object
            setErrorMessage(error.response?.data?.message || 'An error occurred during sign in.');
        }
    };

    return (
        <div className='page'>
            <form onSubmit={handleSubmit} className='formContainer'>
                <header className='formHeader'>
                    <h2>Signin</h2>
                    <p>Cancel</p>
                </header>
                <div className='formBody'>
                    <div className='formGroup'>
                        <div className='form-field'>
                            <label>Email:</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="E-Mail"
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-field'>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <footer className='formFooter'>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className='button' type="submit">Login</button>
                </footer>
            </form>
        </div>
    );
};

export default SignInForm;
