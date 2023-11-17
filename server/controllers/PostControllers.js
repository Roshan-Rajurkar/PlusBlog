const Post = require('../model/Post');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const secret = 'roshanrajurkargothangoan234567890'

const create = async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const fileExtension = parts[parts.length - 1];
    const newPath = path + '.' + fileExtension;
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;

    if (!title || !summary || !content) {
        return res.status(400).json({ success: false, message: 'Title, summary, and content are required fields' });
    }


    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const newPost = await Post.create({
            title,
            summary,
            cover: newPath,
            content,
            author: info.id,
        });

        try {
            const savedPost = await newPost.save();
            console.log(savedPost);
            res.status(200).json({ success: true, data: savedPost });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ success: false, message: 'Error in post uploading' });
        }
    });
};

const getAllPosts = async (req, res) => {

    const posts = await (Post.find()).populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ success: true, data: posts });
};


const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('author', ['username']);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, summary, content } = req.body;

        if (req.file) {
            let newPath = null;
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const fileExtension = parts[parts.length - 1];
            newPath = path + '.' + fileExtension;

            fs.renameSync(path, newPath);

            const updatedPost = await Post.findByIdAndUpdate(
                id,
                {
                    title,
                    summary,
                    content,
                    cover: newPath,
                },
                { new: true }
            );

            if (!updatedPost) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.status(200).json({ success: true, data: updatedPost });
        } else {
            const updatedPost = await Post.findByIdAndUpdate(
                id,
                {
                    title,
                    summary,
                    content,
                },
                { new: true }
            );

            if (!updatedPost) {
                return res.status(404).json({ error: 'Post not found' });
            }

            res.status(200).json({ success: true, data: updatedPost });
        }
    } catch (error) {
        console.error('Error updating post:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { create, getAllPosts, getPost, updatePost };
