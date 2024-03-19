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
    total: {
        type: Number,
        default: 0
    },

}, { timestamps: true });

const Enrollments = mongoose.model('Enrollments', enrollmentsSchema);

export default Enrollments;