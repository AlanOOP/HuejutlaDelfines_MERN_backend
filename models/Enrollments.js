import mongoose from "mongoose";

const enrollmentsSchema = mongoose.Schema({
    enrrollentDate: {
        type: String,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    },
    status: {
        type: String,
        default: 'pending'
    },
    
}, { timestamps: true });