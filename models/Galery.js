import mongoose from 'mongoose';

const GalerySchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Galery = mongoose.model('Galery', GalerySchema);

export default Galery;