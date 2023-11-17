import React, { useContext, useEffect } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'
import axios from 'axios';

const Header = () => {

    const { setUserInfo, userInfo } = useContext(UserContext)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/profile', {
                    credentials: 'include'
                });
                const info = await response.data;
                setUserInfo(info)

            } catch (error) {
                console.log(error.message);
            }
        };
        fetchProfile();
    }, []);

    const logout = async () => {
        try {
            const response = await axios.post('/logout', {}, { credentials: 'include' });
            const status = response.status;

            if (status === 200) {
                alert('Logout successful');
                setUserInfo(null);
            } else {
                alert('Logout failed');
            }
        } catch (error) {
            alert('Logout failed');
        }
    };

    const username = userInfo?.username;

    return (
        <header>
            <a href="/" className="logo">
                PlusBlogs
            </a>
            <nav>
                {username ? (
                    <>
                        <Link to="/create" className='post-btn'>Create Post</Link>
                        <Link onClick={logout} className='btn'>Log out</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <span>/</span>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
