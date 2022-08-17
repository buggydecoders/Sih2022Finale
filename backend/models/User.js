const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    logo: {
        type: String,
        default: "https://res.cloudinary.com/unesco-admin/image/upload/v1660597704/_company-frontend_scmp_images_themes_katy_ghosts_company_ghost_company_200x200_v1_fa0fnj.png"
    },
    banner: {
        type: String,
        default:"https://res.cloudinary.com/unesco-admin/image/upload/v1660721635/Hero-Banner-Placeholder-Dark-1024x480-1_hdepwr.png"
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
        pincode: {
            type: String
        }
    },
    contactPerson: {
        image: {
            type: String,
            default: "https://res.cloudinary.com/unesco-admin/image/upload/v1660597439/images_fywghz.png"
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
        phone: {
            type: String
        },
        signature: {
            type: String
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
    },
    savedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }]
}, {
    timestamps: true
})

const User = new mongoose.model("User", UserSchema);

module.exports = User;