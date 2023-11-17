
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns'
import './PostPage.css';
import { UserContext } from '../context/UserContext';
import { MdEdit } from "react-icons/md";

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { userInfo } = useContext(UserContext);
    useEffect(() => {

        const fetchPost = async () => {
            try {
                const response = await axios.get(`/post/${id}`);
                setPost(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching post:', error.message);
            }
        };

        fetchPost();
    }, [id]);

    return (
        <div className="post-container">
            {post ? (
                <>
                    <div className="post-details">
                        <h1 className="post-title">{post.title}</h1>
                        <p className="post-author">Written by: {post.author.username}</p>
                        <p className="post-date">Published on: {format(new Date(post.createdAt), 'MMM d, yyyy HH:mm aaaa')}</p>
                        {userInfo.id === post.author._id && (
                            <Link className='edit' to={`/edit/${post._id}`}>Edit <MdEdit /></Link>
                        )}
                    </div>
                    <img className="post-cover" src={`http://localhost:5000/${post.cover}`} alt="post cover" />
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostPage;
