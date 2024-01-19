import bcrypt from "bcrypt";
import Users from "../models/Users.js";
import { generateToken } from "../helpers/generateToken.js";
import generarJWT from "../helpers/generateJWT.js";


// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Agregar un usuario
const addUser = async (req, res) => {

    console.log(req.body);
    try {
        const { name, password, age, email, phone } = req.body;

        //Comprobar si el usuario existe 
        const userExist = await Users.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        if (!name || !password || !email || !phone || !age) {
            return res.status(400).json({ message: "Campos Requeridos " });
        }

        const user = new Users({
            name,
            password,
            age,
            email,
            phone
        });

        user.token = generateToken();
        user.password = bcrypt.hashSync(password, 10);
        await user.save();
        res.json({ message: "Usuario creado correctamente" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Login de usuario

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        //Comprobar si el usuario existe
        const userExist = await Users.findOne({ email });

        if (!userExist) {
            const error = new Error("El usuario no existe");
            return res.status(400).json(error);
        }

        //Comprobar si la contraseña es correcta
        const passwordCorrect = bcrypt.compareSync(password, userExist.password);

        if (!passwordCorrect) {
            const error = new Error("La contraseña es incorrecta");
            return res.status(400).json(error);
        }

        //Generar JWT

        const payload = {
            user: {
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                token: generarJWT(userExist.id),
            },
        };

        await res.json(payload);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export {
    getUsers,
    addUser,
    loginUser
};