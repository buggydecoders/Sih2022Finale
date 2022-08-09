const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    instituteName: {
        type: String,
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    aisheCode: {
        type: String
    },
    role: {
        type: String,
        enum: ['institute', 'admin'],
        default: 'institute'
    },
    resetToken: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const User = new mongoose.model("User", UserSchema);

module.exports = User;