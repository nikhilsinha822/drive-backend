const Folder = require('../models/folder.model')
const Images = require('../models/image.model')

const createFolder = async (req, res) => {
    try {
        const { name, parent } = req.body;

        if (!name)
            return res.status(400).json({ message: "Missing required fields" });

        const folder = await Folder.create({
            name: name,
            parent: parent || null,
            owner: req.user._id
        })

        res.status(201).json({ message: "SuccessFully created", data: folder })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const getFolderContent = async (req, res) => {
    try {
        const folder = req.body.folderId || null;

        const childrenFolder = await Folder.find({
            owner: req.user._id,
            parent: folder
        })

        const childrenImages = await Images.find({
            owner: req.user._id,
            parent: folder
        })

        res.status(200).json({
            message: "Success", data: {
                folder: childrenFolder,
                images: childrenImages
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    createFolder,
    getFolderContent,
}