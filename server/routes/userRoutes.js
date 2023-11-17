const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { loginUser, registerUser, getProfile, logoutUser } = require("../controllers/UserControllers")
const { create, getAllPosts, getPost, updatePost } = require('../controllers/PostControllers')
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);
router.post('/create', upload.single('file'), create);
router.get('/all_posts', getAllPosts);
router.get('/post/:id', getPost);
router.get('/edit/:id', getPost);
router.put('/edit/:id', upload.single('file'), updatePost);

module.exports = router;