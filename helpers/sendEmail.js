import nodemailer from "nodemailer";
import { generateOTP } from "./generateOTP.js";

export const emailRegistro = async (datos) => {
  const { email, nombre, token, codeOTP } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email, codigo otp para confirmar el correo

  await transport.sendMail({
    from: '"Huejutla Delfines - Escuela de Natación"',
    to: email,
    subject: "Huejutla Delfines - Confirma tu correo",
    text: "Confirma tu correo",
    html: `
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
        }
    </style>
    <script src=${"https://cdn.tailwindcss.com"}></script>
    </head>

    <body>

        <header className="flex justify-center items-center bg-gradient-to-r from-cyan-400 to-blue-500">
            
            <div>
                <h1 className="my-10 text-white text-3xl font-bold">Huejutla Delfines</h1>
            </div>
        </header>

        <main className="bg-gradient-to-r from-cyan-400 to-blue-500">
            <section className="flex flex-col container mx-auto justify-center items-center text-center pb-5">
                <h2 className="text-center text-white text-3xl font-bold my-5">
                    Hola Alan Alexis, Has solicitado confirmar tu correo
                </h2>

                <div className="text-2xl font-bold">
                    <p>El código de confirmación es: </p>
                    <p className="text-5xl font-extrabold my-5 text-slate-200"> ${codeOTP}</p>
                    <p>Da click el siguiente enlace para confirmar tu correo: </p>
                    <div className="my-10">
                        <a href="${process.env.FRONTEND_URL}/confirmar/${token}"
                            className="py-5 bg-yellow-400 hover:bg-yellow-500 cursor-pointer my-10 px-2 rounded-sm">Confirmar
                            Correo</a>
                    </div>

                    <p>Si tu no solicitaste este email, puedes ignorar el mensaje.</p>
                </div>
            </section>
        </main>
        <scrip src="https://cdn.tailwindcss.com"></scrip>
    </body>
    `,
  });

};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  await transport.sendMail({
    from: '"Huejutla Delfines - Escuela de Natación" <cuentas@huejutladelfines.com>',
    to: email,
    subject: "Huejutla Delfines - Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `<p>Hola: ${nombre} has solicitado reestablecer tu password</p>

    <p>Sigue el siguiente enlace para generar un nuevo password: 

    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
    
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    `,
  });

  // console.log(info);
};

export const userAttemps = async (datos) => {
  const { email, nombre, attemps } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  await transport.sendMail({
    from: '"Huejutla Delfines - Escuela de Natación" ',
    to: email,
    subject: "Huejutla Delfines - Intentos de acceso",
    text: "Intentos de acceso",
    html: `<p>Hola: ${nombre} has realizado ${attemps} intentos de acceso</p>
    
    <p> Si no fuiste tu, te recomendamos cambiar tu password</p>
    <p> Tu cuenta se deshabilitara por un tiempo. </p>

    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>

    `,
  });

};

//aviso al administrador de intentos de acceso

export const adminAttemps = async (datos) => {
  const { email, nombre, attemps } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },

  });

  // Información del email

  await transport.sendMail({
    from: '"Huejutla Delfines - Escuela de Natación" ',
    to: process.env.EMAIL_ADMIN,
    subject: "Huejutla Delfines - Intentos de acceso",
    text: "Intentos de acceso",
    html: `<p>Hola: El usuario ${nombre} ha realizado ${attemps} intentos de acceso</p>

    <p>  Revisa el estado de la cuenta y toma las medidas necesarias, para evitar accesos no autorizados. </p>
    `,
  });
}