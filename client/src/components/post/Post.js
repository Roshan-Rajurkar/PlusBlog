import React from 'react'
import './Post.css'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
const Post = ({ post }) => {

    const { _id, title, cover, summary, createdAt, author } = post;
    const formattedCover = cover.replace(/\\/g, '/');
    return (
        <div className="post">
            <Link to={`/post/${_id}`}>
                <div className="image">
                    <img src={'http://localhost:5000/' + formattedCover} alt='cover' />
                </div >
            </Link>
            <div className='text'>
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className='author__info'>
                    <a className='author'>
                        {author.username}
                    </a>
                    <i className='time'>{format(new Date(createdAt), 'MMM d, yyyy HH:mm aaaa')}</i>
                </p>
                <p className='summary'>{summary}</p>
            </div>
        </div >
    )
}

export default Post