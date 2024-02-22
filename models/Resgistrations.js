import mongoose from "mongoose";

const registrationSchema = mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    id_course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses"
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }
);