const mongoose = require('mongoose')

const SaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    resource: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Resource",
        default: []
    }
}, {
    timestamps: true
})

const SavedItem = mongoose.model('SavedItem', SaveSchema)
module.exports = SavedItem