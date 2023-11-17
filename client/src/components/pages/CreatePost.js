import React, { useState } from 'react';
import './CreatePost.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setThumbnail] = useState([]);
    const navigate = useNavigate();
    const createNewPost = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set('title', title);
        formData.set('summary', summary);
        formData.set('content', content);
        formData.set('file', files[0]);

        try {
            console.log(formData)
            const response = await axios.post('/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    credentials: 'include',
                },
            });

            navigate('/');

            console.log(response.data);
        } catch (error) {
            console.error('Error creating the post:', error);
        }
    }

    return (
        <>
            <h2 className='heading'>Create new post</h2>
            <form onSubmit={createNewPost}>
                <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Summary' value={summary} onChange={(e) => setSummary(e.target.value)} />
                <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files)} />
                <ReactQuill className='post__field' value={content} modules={modules} formats={formats} onChange={(newValue) => setContent(newValue)} />
                <button>Create post</button>
            </form>
        </>
    );
}

export default CreatePost;
