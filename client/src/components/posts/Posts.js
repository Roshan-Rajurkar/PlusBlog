import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/all_posts');
                const data = await response.data;
                console.log(data)
                setPosts(data.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();

    }, []);

    return (
        <>
            {
                posts.length > 0 ?
                    posts.map((post) => {
                        return <Post post={post} key={post._id} />;
                    }) :
                    <p>No posts yet..</p>
            }
        </>
    );
};

export default Posts;
