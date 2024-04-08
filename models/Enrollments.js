import mongoose from "mongoose";

const enrollmentsSchema = mongoose.Schema({

    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    },
    dateEnrollment:{
        type: String,
        default: Date.now
    },
    methodPayment:{
        type: String,
        default: 'paypal'
    },

    status:{
        type: String,
        default: 'pending'
    },
    amount:{
        type: Number,
        default: 0
    }



}, { timestamps: true });

const Enrollments = mongoose.model('Enrollments', enrollmentsSchema);

export default Enrollments;