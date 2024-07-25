import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
    newsId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date()
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Comments = mongoose.model('Comments', commentsSchema);

export default Comments;