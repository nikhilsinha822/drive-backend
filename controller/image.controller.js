const { uploadImagesArray } = require('../utils/imageHandler')
const Image = require('../models/image.model')
const axios = require('axios')
const cloudinary = require('cloudinary').v2

const uploadImage = async (req, res) => {
    try {
        if (!req.files)
            return res.status(400).json({ message: "Images are missing" })

        const result = await uploadImagesArray(req.user._id, req.files)

        const images = result.map((image, ind) => {
            return {
                name: req.files[ind].originalname,
                cloudinaryId: image.public_id,
                owner: req.user._id,
                parent: req.body.parent || null
            }
        })
        const data = await Image.insertMany(images);

        const dataToSend = data.map((image) => {
            return {
                _id: image._id,
                name: image.name,
                owner: image.owner,
                parent: image.parent,
                createdAt: image.createdAt,
                updatedAt: image.updatedAt
            }
        });

        res.status(200).json({ message: "Success", data: dataToSend })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getImage = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await Image.findById(id)

        if (!image)
            return res.status(404).json({ message: "Image not found" })

        if (JSON.stringify(image.owner) !== JSON.stringify(req.user._id))
            return res.status(403).json({ message: "Access Denied" })

        const signedUrl = cloudinary.url(image.cloudinaryId, {
            sign_url: true,
            type: 'private',
            secure: true,
            expires_at: Math.floor(Date.now() / 1000) + 60
        })

        const response = await axios({
            method: 'get',
            url: signedUrl,
            responseType: 'stream'
        });

        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Length', response.headers['content-length']);

        response.data.pipe(res);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const searchImage = async (req, res) => {
    try {
        const imageName = req.query.image;

        const result = await Image.find({
            $text: {
                $search: imageName
            },
            owner: req.user._id
        })

        if (!result)
            return res.status(404).json({ message: "Not Found" })

        res.status(200).json({ message: "Success", data: result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    uploadImage,
    getImage,
    searchImage
}