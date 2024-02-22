import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
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
    },
    amount: {
        type: Number,
        default: 0
    }
}, { timestamps: true }
);