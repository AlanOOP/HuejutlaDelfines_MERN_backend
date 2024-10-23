import jwt from "jsonwebtoken";

const generarJWT = (id) => {
    return jwt.sign({ id }, 'palabrasecreta', {
        expiresIn: "30d",
    });
};
export default generarJWT;

