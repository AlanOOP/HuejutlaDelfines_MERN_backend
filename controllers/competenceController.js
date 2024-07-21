import Competence from "../models/Competence.js";
import cloudinary from "../helpers/cloudinary.js";

const getCompetences = async (req, res) => {
    try {
        const competences = await Competence.find();
        res.status(200).json(competences);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getCompetenceById = async (req, res) => {
    const { id } = req.params;

    try {

        if (!id) {
            const error = new Error('Id is required');
            return res.status(404).json(error.message);
        }
        const competence = await Competence.findById(id);
        res.status(200).json(competence);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

const addCompetence = async (req, res) => {
    const { title, content, date, place } = req.body;

    let img = req.file;

    try {

        if (!title || !content || !date || !place) {
            const error = new Error('Title, Content, Date and Place are required');
            return res.status(404).json(error.message);
        }

        const result = await cloudinary.uploader.upload(img.path, {
            folder: 'activities',
            width: 1200,
            crop: "scale"
        });

        const newCompetence = new Competence({
            title,
            content,
            date,
            place,
            url: result.secure_url,
            public_id: result.public_id,
        });

        const competence = await newCompetence.save();

        res.status(200).json(competence);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const updateCompetence = async (req, res) => {
    const { id } = req.params;
    const { title, content, date, place } = req.body;

    try {

        if (!id) {
            const error = new Error('Id is required');
            return res.status(404).json(error.message);
        }

        if (!title || !content || !date || !place) {
            const error = new Error('Title, Content, Date and Place are required');
            return res.status(404).json(error.message);
        }

        const competence = await Competence.findById(id);

        if (!competence) {
            const error = new Error('Competence not found');
            return res.status(404).json(error.message);
        }

        if (req.file) {
            await cloudinary.uploader.destroy(competence.public_id);
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'activities',
                width: 1200,
                crop: "scale"
            });

            competence.url = result.secure_url;
            competence.public_id = result.public_id;
        }

        competence.title = title;
        competence.content = content;
        competence.date = date;
        competence.place = place;

        const updatedCompetence = await competence.save();

        res.status(200).json(updatedCompetence);

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

const deleteCompetence = async (req, res) => {
    const { id } = req.params;

    try {

        if (!id) {
            const error = new Error('Id is required');
            return res.status(404).json(error.message);
        }

        const competence = await Competence.findById(id);

        if (!competence) {
            const error = new Error('Competence not found');
            return res.status(404).json(error.message);
        }

        await cloudinary.uploader.destroy(competence.public_id);

        await Competence.findByIdAndDelete(id);

        res.status(200).json({ message: 'Competence deleted' });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}


export {
    getCompetences,
    getCompetenceById,
    addCompetence,
    updateCompetence,
    deleteCompetence
}