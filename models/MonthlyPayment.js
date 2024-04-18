import mongoose from 'mongoose';

const MonthlyPaymentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    pagos: [{
        fecha: {
            type: String,
        },
        monto: {
            type: Number,
        },
    }]

}, {
    timestamps: true,
});

const MonthlyPayment = mongoose.model('MonthlyPayment', MonthlyPaymentSchema);

export default MonthlyPayment;