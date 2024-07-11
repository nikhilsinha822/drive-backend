const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer')
const PORT = process.env.PORT || 3500;
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')

connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/auth', require('./router/auth.router'));
app.use('/image', require('./router/image.router'));
app.use('/folder', require('./router/folder.router'));

mongoose.connection.once("open", () => {
    console.log('Connected to DB')
    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`)
    })
})