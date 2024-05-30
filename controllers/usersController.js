import bcrypt from "bcrypt";
import Users from "../models/Users.js";
import Student from "../models/Student.js";
import Logs from "../models/Logs.js";
import { generateToken } from "../helpers/generateToken.js";
import generarJWT from "../helpers/generateJWT.js";
import { generateOTP } from "../helpers/generateOTP.js";
import { emailRegistro, emailOlvidePassword, userAttemps, adminAttemps } from "../helpers/sendEmail.js";
import jwt from "jsonwebtoken";

// Obtener todos los usuarios
const getUsers = async (req, res) => {

    //obetner ip y el navegador session
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const session = req.headers['user-agent'];

    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Obtener un usuario por jwt

const getProfile = async (req, res) => {
    const { user } = req;

    res.json({ user });
}


// Obtener un usuario por id y buscar estudiante populate user 

const getUserProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findById(id);
        const student = await Student.findOne({ user: user._id });

        res.json(student);

    } catch (error) {
        // console.log(error);
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
            password,
            email,
        });

        const codeOTP = generateOTP();
        user.token = generateToken();
        user.password = bcrypt.hashSync(password, 10);
        user.codeOTP = codeOTP;

        const student = new Student({
            name,
            lastName,
            age,
            phone,
            user: user._id,
        });

        await student.save();

        //Enviar email
        const datos = {
            email: user.email,
            nombre: student.name,
            token: user.token,
            codeOTP: user.codeOTP,
        };

        await emailRegistro(datos);

        await user.save();
        res.json({ message: "Usuario creado correctamente" });

    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

//confirmar usuario

const confirmar = async (req, res) => {
    const { token } = req.params;
    const user = await Users.findOne({
        token
    });

    if (!user) {
        return res.status(400).json({ message: "Token no valido" });
    }

    user.confirm = true;
    await user.save();

    res.json({ message: "Usuario confirmado correctamente" });
}

const verifyOTP = async (req, res) => {

    const { token, codeOTP } = req.body;

    const user = await Users.findOne({ token });

    if (!user) {
        const error = new Error("El usuario no existe");
        return res.status(400).json(error.message);
    }

    if (user.codeOTP !== codeOTP) {
        const error = new Error("El codigo no es valido");
        return res.status(400).json(error.message);
    }

    user.confirm = true;
    user.codeOTP = '';
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


        //comprobar si el usuarios esta bloqueado 

        if (userExist.isBlocked) {
            const error = new Error("El usuario esta bloqueado");
            return res.status(400).json(error.message);
        }


        //Comprobar si la contraseña es correcta
        const passwordCorrect = bcrypt.compareSync(password, userExist.password);

        if (!passwordCorrect) {
            userExist.loginAttempts += 1;
            if (userExist.loginAttempts >= 5) {
                userExist.isBlocked = true;
                userExist.blockExpires = new Date(Date.now() + 60 * 60 * 1000);
                await userExist.save();

                const datos = {
                    email: userExist.email,
                    nombre: userExist.name,
                    attemps: userExist.loginAttempts,
                };

                await userAttemps(datos);
                await adminAttemps(datos);

                //log de prueba ip, navegador, hora de peticion, localizacion

                // const logs = new Logs({
                //     ip: req.ip,
                //     navegador: req.headers['user-agent'],
                //     description: "Usuario bloqueado",
                //     url: "/singUp",
                //     user: userExist._id,
                // });

                // await logs.save();

            }

            await userExist.save();
            const error = new Error("La contraseña no es correcta");
            return res.status(400).json(error.message);
        }

        userExist.loginAttempts = 0;
        userExist.isBlocked = false;

        await userExist.save();

        //Generar JWT

        const token = generarJWT(userExist.id);

        const payload = {
            user: {
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                token: token,
                role: userExist.role,
            },
        };

        const encode = jwt.verify(token, process.env.JWT_SECRET);

        //log de inicio de sesión ip, navegador, hora de peticion, localizacion

        // const logs = new Logs({
        //     ip: req.ip,
        //     navegador: req.headers['user-agent'],
        //     description: "Inicio de sesión",
        //     url: "/singUp",
        //     user: userExist._id,
        // });

        // await logs.save();

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

        const student = await Student.findOne({ user: user._id });
        //Enviar email
        const datos = {
            email: user.email,
            nombre: student.name,
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
        // console.log(error);
        res.status(500).json({ message: "Hubo un error" });
    }

}

export {
    getUsers,
    singIn,
    singUp,
    forgotPassword,
    resetPassword,
    confirmar,
    verifyOTP,
    getProfile,
    getUserProfile
};