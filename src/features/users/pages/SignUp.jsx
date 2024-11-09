// Import styles and libraries
import '../../../App.scss';
import React from 'react';
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
    return (
        <div className="signup-page">
            <h2>Sign Up</h2>
            <SignUpForm />
        </div>
    );
};

export default SignUp;
