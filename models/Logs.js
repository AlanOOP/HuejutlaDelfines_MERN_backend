import mongoose from 'mongoose'

const LogsSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    navegador: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Logs', LogsSchema);