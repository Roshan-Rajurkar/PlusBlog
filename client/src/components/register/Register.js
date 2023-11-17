import React, { useState } from 'react';
import '../login/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {
            username: '',
            email: '',
            password: '',
        };

        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 6) {
            newErrors.username = 'Username must be at least 6 characters long';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => !error)) {
            try {
                const response = await axios.post('/register', formData);
                console.log("Register response: ", response);
                if (response.status === 200) {
                    alert("Register Successful");
                    navigate('/login');
                }
            } catch (error) {
                alert(error);
                console.log('Register failed. Please check your credentials.');
            }
        }
    };

    return (
        <div className="login__container">
            <form onSubmit={onSubmit}>
                <h3>Register Here</h3>
                <div className="input_box">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.username && <p style={{ 'color': 'red' }} className="error-message">{errors.username}</p>}
                </div>
                <div className="input_box">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.email && <p style={{ 'color': 'red' }} className="error-message">{errors.email}</p>}
                </div>
                <div className="input_box">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.password && <p style={{ 'color': 'red' }} className="error-message">{errors.password}</p>}
                </div>

                <button type="submit">Register</button>
                <div className="input_box">
                    <p>
                        Already have an account <Link to="/login">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Register;
