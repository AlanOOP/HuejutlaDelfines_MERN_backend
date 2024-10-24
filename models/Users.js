import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        trim: true
    },
    confirm: {
        type: Boolean,
        default: false
    },
    role: {
        type: Number,
        default: 0
    },
    codeOTP: {
        type: String,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dxpbz65ha/image/upload/v1728767537/tkekgusmegtzqkcmnigp.png"
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    blockExpires: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);
export default Users;