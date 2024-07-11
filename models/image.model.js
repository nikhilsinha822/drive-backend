const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const imageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        default: null,
        index: true
    }
}, {timestamps : true})

imageSchema.index({name: 'text'})

module.exports = mongoose.model('Image', imageSchema)