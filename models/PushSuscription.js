import mongoose from "mongoose";

const PushSuscriptionSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true,
        unique: true,
    },
    expirationTime: {
        type: Date,
        default: null,
    },
    keys: {
        auth: {
            type: String,
            required: true,
        },
        p256dh: {
            type: String,
            required: true,
        },
    }
});

const PushSuscription = mongoose.model('PushSuscription', PushSuscriptionSchema);

export default PushSuscription;