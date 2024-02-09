import bcrypt from "bcrypt";
import Users from "../models/Users.js";
import { generateToken } from "../helpers/generateToken.js";
import generarJWT from "../helpers/generateJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/sendEmail.js";


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
const singIn = async (req, res) => {

    try {

        const { name, lastName, password, age, email, phone } = req.body;

        //Comprobar si el usuario existe 
        const userExist = await Users.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        if (!name || !password || !email || !phone || !age || !lastName) {
            return res.status(400).json({ message: "Campos Requeridos " });
        }

        const user = new Users({
            name,
            lastName,
            password,
            age,
            email,
            phone
        });

        user.token = generateToken();
        user.password = bcrypt.hashSync(password, 10);

        //Enviar email
        const datos = {
            email: user.email,
            nombre: user.name,
            token: user.token,
        };

        await emailRegistro(datos);

        await user.save();
        res.json({ message: "Usuario creado correctamente" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

//confirmar usuario

const confirmar = async (req, res) => {
    const { token } = req.params;

    console.log(token);

    const user = await Users.findOne({
        token
    });

    if (!user) {
        return res.status(400).json({ message: "Token no valido" });
    }

    user.confirm = true;
    user.token = '';
    await user.save();

    res.json({ message: "Usuario confirmado correctamente" });
}


// Login de usuario

const singUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        //Comprobar si el usuario existe
        const userExist = await Users.findOne({ email });

        if (!userExist) {
            const error = new Error("El usuario no existe");
            return res.status(400).json(error.message);
        }

        if (!userExist.confirm) {
            const error = new Error("El usuario no esta confirmado");
            return res.status(400).json(error.message);
        }

        //Comprobar si la contraseña es correcta
        const passwordCorrect = bcrypt.compareSync(password, userExist.password);

        if (!passwordCorrect) {
            const error = new Error("La contraseña no es correcta");
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
        res.status(500).json({ message: "Hubo un error" });
    }
}

//olvide password 

const forgotPassword = async (req, res) => {
    console.log(req.body);
    try {
        const { email } = req.body;
        //Comprobar si el usuario existe
        const user = await Users.findOne({ email });

        if (!user) {
            const error = new Error("El usuario no existe");
            return res.status(400).json({ message: error.message });
        }
        //Generar token
        user.token = generateToken();
        await user.save();

        //Enviar email
        const datos = {
            email: user.email,
            nombre: user.name,
            token: user.token,
        };

        await emailOlvidePassword(datos);

        res.json({ message: "Se envio un email para reestablecer tu password" });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Hubo un error" });
    }

}

const resetPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const user = await Users.findOne({ token });

    try {
        if (!user) {

            return res.status(400).json({ message: "Token no valido" });
        }
        user.password = bcrypt.hashSync(password, 10);
        user.token = '';
        await user.save();
        res.json({ message: "Password actualizado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Hubo un error" });
    }

}


export {
    getUsers,
    singIn,
    singUp,
    forgotPassword,
    resetPassword,
    confirmar
};