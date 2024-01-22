import express from 'express';
import {
    getUsers,
    singUp,
    singIn,
} from '../controllers/usersController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/singUp', singUp);
router.post('/singIn', singIn);

export default router;
