const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const imageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    clodinaryId: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        default: null,
        index: true
    }
}, {timestamps : true})

module.exports = mongoose.model('Image', imageSchema)