import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import {
    getUsers,
    singUp,
    singIn,
    forgotPassword,
    resetPassword,
    confirmar,
    verifyOTP,
    getProfile
} from '../controllers/usersController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/singUp', singUp);
router.post('/singIn', singIn);
router.post("/olvide-password", forgotPassword);
router.post("/olvide-password/:token", resetPassword);
router.get("/confirm/:token", confirmar);
router.post("/otp-verification", verifyOTP);
router.get("/user/profile", checkAuth, getProfile);

export default router;
