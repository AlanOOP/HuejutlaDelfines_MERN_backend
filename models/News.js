import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
);

const News = mongoose.model('News', newsSchema);

export default News;