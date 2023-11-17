const User = require("../model/User");
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
const secret = 'roshanrajurkargothangoan234567890'

const loginUser = async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await User.findOne({ username: userData.username });

        if (!newUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        const matchUser = await bcrypt.compare(userData.password, newUser.password);

        if (matchUser) {
            console.log("Log in");

            jwt.sign({ username: newUser.username, id: newUser._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).status(200).json({
                    id: newUser._id,
                    username: newUser.username
                })
            })

        } else {
            console.log("Error in log in");
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const registerUser = async (req, res) => {
    const data = req.body;

    console.log('register request')

    try {
        const userAlreadyExist = await User.findOne({ email: data.email });

        if (userAlreadyExist) {
            console.log("User already exists, try login.");
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({
            username: data.username,
            email: data.email,
            password: await bcrypt.hash(data.password, 10),
        });

        const saveUser = await newUser.save();
        console.log(saveUser);
        if (saveUser) {
            console.log(saveUser)
            res.status(200).json(saveUser);
        } else {
            console.log('Error in register: User not saved');
            res.status(500).json({ error: 'Registration failed' });
        }
    } catch (error) {
        console.error('Error in register:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



const getProfile = (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, (err, info) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log(info)
        res.json(info);
    });
}


const logoutUser = (req, res) => {
    res.clearCookie('token').status(200).json({ message: 'Logged out successfully' });
}


module.exports = { loginUser, registerUser, getProfile, logoutUser };