const mongoose = require('mongoose')
const Schema = mongoose.Schema

const folderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        default: null,
        index: true
    }
}, {timestamps : true})

module.exports = mongoose.model("Folder", folderSchema)