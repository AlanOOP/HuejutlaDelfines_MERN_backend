import mongoose from "mongoose";

const paymentsSchema = mongoose.Schema({
    paymentDate: {
        type: String,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        default: 'paypal'
    },
    amount:{
        type: Number,
        default: 0
    },
    referenceNumber:{
        type: String,
        default: ''
    },
    enrrollment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollments'
    }

}, { timestamps: true });

const Payments = mongoose.model('Payments', paymentsSchema);
export default Payments;