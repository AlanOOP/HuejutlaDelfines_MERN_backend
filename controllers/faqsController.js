import Faqs from "../models/Faqs.js";

const getFaqs = async (req, res) => {
    try {
        const faqs = await Faqs.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//By id

const getFaqById = async (req, res) => {
    const { id } = req.params;
    try {

        if (!id) {
            const error = new Error('Id is required');
            return res.status(404).json(error.message);
        }
        const faq = await Faqs.findById(id);
        res.status(200).json(faq);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

const addFaq = async (req, res) => {
    const { question, answer } = req.body;

    try {

        if (!question || !answer) {
            const error = new Error('Question and Answer are required');
            return res.status(404).json(error.message);
        }

        const faq = await Faqs.create({ question, answer });

        res.status(200).json(faq);

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

const updateFaq = async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    try {

        if (!id) {
            const error = new Error('Id is required');
            return res.status(404).json(error.message);
        }

        if (!question || !answer) {
            const error = new Error('Question and Answer are required');
            return res.status(404).json(error.message);
        }

        const faq = await Faqs.findByIdAndUpdate(id, { question, answer }, { new: true });

        res.status(200).json(faq);

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}


const deleteFaq = async (req, res) => {
    const { id } = req.params;

    try {

        if (!id) {
            const error = new Error('Id is required');
            return res.status(404).json(error.message);
        }

        const faq = await Faqs.findByIdAndDelete(id);

        res.status(200).json(faq);

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export {
    getFaqs,
    getFaqById,
    addFaq,
    updateFaq,
    deleteFaq
};