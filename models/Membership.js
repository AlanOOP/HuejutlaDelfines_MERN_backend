import mongoose from "mongoose";

const membershipSchema = mongoose.Schema({
    
    amount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;