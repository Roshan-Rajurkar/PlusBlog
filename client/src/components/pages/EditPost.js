import React, { useEffect, useState } from 'react';
import './CreatePost.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setThumbnail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/edit/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
                setSummary(response.data.summary);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error.message);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const updatePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set('title', title);
        formData.set('summary', summary);
        formData.set('content', content);

        if (files?.[0]) {
            formData.set('file', files?.[0]);
        }

        try {
            const response = await axios.put(`/edit/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    credentials: 'include',
                },
            });

            navigate('/post/' + id);

            console.log(response.data);
        } catch (error) {
            console.error('Error updating the post:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h2 className='heading'>Edit post</h2>
            <form onSubmit={updatePost}>
                <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Summary' value={summary} onChange={(e) => setSummary(e.target.value)} />
                <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files)} />
                <ReactQuill className='post__field' value={content} modules={modules} formats={formats} onChange={(newValue) => setContent(newValue)} />
                <button>Update post</button>
            </form>
        </>
    );
};

export default EditPost;
