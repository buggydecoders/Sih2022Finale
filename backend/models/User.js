const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    logo: {
        type: String,
        default:"https://res.cloudinary.com/unesco-admin/image/upload/v1660597236/Placeholder-1100_9623f00f-8faa-4ff1-83ae-a74c00cc0808_480x480_urgk3z.webp"
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
        },
        pincode : {
            type : String
        }
    },
    contactPerson: {
        image: {
            type: String,
            default:"https://res.cloudinary.com/unesco-admin/image/upload/v1660597439/images_fywghz.png"
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