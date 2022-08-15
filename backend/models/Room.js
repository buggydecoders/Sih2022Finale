const {Schema,model,models} = require('mongoose');


const roomSchema  = new Schema({
    users : [{
        type : String,
        ref : 'User'
    }],
    lastMessage : {
        type : String,
        ref : 'Message',
        default : null
    },
    isActive : {
        type : Boolean,
        default : true
    }
}, {
    timestamps : true
})

const Room = model('Room', roomSchema);

module.exports = Room;