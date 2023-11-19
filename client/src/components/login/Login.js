import React, { useState, useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

function Login() {
    const navigate = useNavigate();
    const { setUserInfo } = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', formData, { credentials: 'include' });
            console.log("Login response: ", response);
            const data = response.data;
            setUserInfo(data);
            navigate('/');

        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login__container">
            <form onSubmit={onSubmit}>
                <h3>Login Here</h3>
                {error && <p className='error-message'>{error}</p>}
                <div className='input_box'>
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
                </div>
                <div className='input_box'>
                    <label htmlFor="password">Password</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                        </div>
                    </div>
                </div>
                <button type="submit">Log In</button>
                <div className="input_box">
                    <p>Don't have an account yet <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
