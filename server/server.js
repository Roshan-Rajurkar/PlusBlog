const express = require("express")
const app = express();
const path = require('path');
const cors = require("cors")
const cookieParser = require('cookie-parser')
const DBconnect = require('./config/DBconnect')

const UserRoutes = require('./routes/userRoutes')

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000/login' }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
DBconnect();

app.use('/', UserRoutes)

app.get('/', (req, res) => {
    res.send({ "status": "working" })
})

app.listen(5000, (req, res) => {
    console.log('server is running on port 5000')
})