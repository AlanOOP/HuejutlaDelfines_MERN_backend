import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
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
    phone: {
        type: String,
        trim: true
    },
    token: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    }
})

const Student = mongoose.model('Student', studentSchema);
export default Student;