import mongoose from "mongoose";

const CompetenceSchema = new mongoose.Schema({
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
    place: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
}
);


const Competence = mongoose.model('Competence', CompetenceSchema);

export default Competence;