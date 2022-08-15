const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    logo: {
        type: String
    },
    instituteName: {
        type: String,
    },
    website: {
        type: String
    },
    socialLinks: {
        type: Object
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        }
    },
    contactPerson: {
        image: {
            type: String
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        position: {
            type: String
        },
        phone : {
            type : String
        }
    },
    resource: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    aisheCode: {
        type: String
    },
    naac: {
        type: String
    },
    reputationPoint: {
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