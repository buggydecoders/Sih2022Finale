const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    logo: {
        type: String,
        default: "https://res.cloudinary.com/unesco-admin/image/upload/v1660597704/_company-frontend_scmp_images_themes_katy_ghosts_company_ghost_company_200x200_v1_fa0fnj.png"
    },
    banner: {
        type: String,
        default: "https://res.cloudinary.com/unesco-admin/image/upload/v1660722255/banner-placeholder_nyqa5j.webp"
    },
    instituteName: {
        type: String,
    },
    username: {
        type: String
    },
    website: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    walletAddress: {
        type: String
    },
    socialLinks: {
        type: Object
    },
    agreementContractAddress: {
        type: String
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
    isBan: {
        type: Boolean,
        default: false
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

const User = mongoose.model("User", UserSchema);

module.exports = User;