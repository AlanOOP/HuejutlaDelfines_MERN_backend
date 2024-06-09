import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;