import mongoose from "mongoose";

const instructorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: String,
        trim: true
    },
    speciality: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

const Instructor = mongoose.model('Instructor', instructorSchema);

export default Instructor;