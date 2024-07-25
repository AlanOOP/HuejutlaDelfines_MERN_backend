import mongoose from "mongoose";

const studentEvaluationSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    trainingType: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
}, { timestamps: true });


const StudentEvaluation = mongoose.model('StudentEvaluation', studentEvaluationSchema);

export default StudentEvaluation;