import mongoose from 'mongoose';

const SecretQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

const SecretQuestion = mongoose.model('SecretQuestion', SecretQuestionSchema);

export default SecretQuestion;