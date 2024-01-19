import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: String,
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
    avatar: {
        type: String,
        default: "avatar.png"
    }
});

const Users = mongoose.model('Users', userSchema);
export default Users;