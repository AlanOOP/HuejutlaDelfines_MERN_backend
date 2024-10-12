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
    getProfile,
    getUserProfile,
    changeAvatar,
} from '../controllers/usersController.js';
import multer from 'multer';


const router = express.Router();

const storage = multer.diskStorage({});

const upload = multer({ storage });

router.get('/users', getUsers);
router.post('/singUp', singUp);
router.post('/singIn', singIn);
router.post("/olvide-password", forgotPassword);
router.post("/olvide-password/:token", resetPassword);
router.get("/confirm/:token", confirmar);
router.post("/otp-verification", verifyOTP);
router.get("/user/profile", checkAuth, getProfile);
router.get("/user/:id", getUserProfile);
router.post("/user/avatar/:id", upload.single('img'), changeAvatar);

export default router;
