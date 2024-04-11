import SecretQuestion from "../models/SecretQuestion.js";
import Users from "../models/Users.js";
import { generateToken } from "../helpers/generateToken.js";

//add secret question

const addSecretQuestion = async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    console.log(id);

    try {
        const user = await Users.findById(id);

        if (!question || !answer) {
            const error = new Error("Todos los campos son obligatorios");
            return res.status(400).json(error.message);
        }

        if (!user) {
            const error = new Error("El usuario no existe");
            return res.status(404).json(error.message);
        }

        //check if the user already has a secret question

        const secretQuestionExist = await SecretQuestion.findOne({ user: user._id });

        if (secretQuestionExist) {
            const error = new Error("El usuario ya tiene una pregunta secreta");
            return res.status(400).json(error.message);
        }

        const secretQuestion = new SecretQuestion({
            question,
            answer,
            user: user._id
        });

        await secretQuestion.save();
        res.json({ message: "Pregunta secreta agregada correctamente" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//get secret question by user

const getSecretQuestionByUser = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            const error = new Error("El usuario no existe");
            return res.status(404).json(error.message);
        }

        const secretQuestion = await SecretQuestion.findOne({ user: user._id }).populate("user");

        if (!secretQuestion) {
            const error = new Error("No se encontro la pregunta secreta");
            return res.status(404).json(error.message);
        }

        const token = generateToken();
        user.token = token;
        await user.save();

        const newSecretQuestion = await SecretQuestion.findOne({ user: user._id }).populate("user");
        return res.json(newSecretQuestion);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// compare secret question

const compareSecretQuestion = async (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;

    try {
        const user = await Users.findById(id);

        if (!user) {
            const error = new Error("El usuario no existe");
            return res.status(404).json(error.message);
        }

        const secretQuestion = await SecretQuestion.findOne({ user: user._id });

        if (!secretQuestion) {
            const error = new Error("No se encontro la pregunta secreta");
            return res.status(404).json(error.message);
        }

        if (secretQuestion.answer !== answer) {
            const error = new Error("Respuesta incorrecta");
            return res.status(400).json(error.message);
        }

        res.json({ message: "Respuesta correcta" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//verificar que exista el correo


export {
    addSecretQuestion,
    getSecretQuestionByUser,
    compareSecretQuestion
};