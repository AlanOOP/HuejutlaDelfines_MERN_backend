import express from 'express';
import {
    getUsers,
    singUp,
    singIn,
    forgotPassword,
    resetPassword,
    confirmar
} from '../controllers/usersController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/singUp', singUp);
router.post('/singIn', singIn);
router.post("/olvide-password", forgotPassword);
router.post("/olvide-password/:token", resetPassword);
router.get("/confirm/:token", confirmar);

export default router;
