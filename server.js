const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3500;
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const connectDB = require('./config/dbConn')

connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(cookieParser())

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use('/auth', require('./router/auth.router'));
app.use('/image', require('./router/image.router'));
app.use('/folder', require('./router/folder.router'));

mongoose.connection.once("open", () => {
    console.log('Connected to DB')
    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`)
    })
})