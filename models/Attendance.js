import mongoose from "mongoose";

//pase de lista schema

const attendanceSchema = mongoose.Schema({
    date: {
        type: String,
        default: Date.now
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    status: {
        type: String,
        default: 'absent'
    },
    total: {
        type: Number,
        default: 0
    },

}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;