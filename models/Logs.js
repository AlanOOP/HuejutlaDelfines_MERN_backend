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
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

export default mongoose.model('Logs', LogsSchema);