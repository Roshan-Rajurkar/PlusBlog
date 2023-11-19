import React from 'react';
import './Footer.css';
import { BsPersonWorkspace } from "react-icons/bs";

const Footer = () => {
    return (
        <footer>
            <div className="footer-left">
                PlusBlogs
            </div>
            <div className="footer-center">
                copyright&copy;: {new Date().getFullYear()}
            </div>
            <div className="footer-right">
                <a href="https://roshanrajurkar.online" target="_blank" rel="noopener noreferrer">
                    <BsPersonWorkspace />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
