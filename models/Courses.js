import mongoose from "mongoose";

const coursesSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    image: {
        type: Array,
    },
    price: {
        type: Number,
        default: 0
    },
    offer: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    },
    cupos: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const Courses = mongoose.model('Courses', coursesSchema);

export default Courses;