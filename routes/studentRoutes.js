import express from 'express';

import {
    getStudents,
    getStudent,
    getStudentByUser,
    updateProfile
} from '../controllers/studentController.js'

const router = express.Router();

router.get('/student', getStudents);
router.get('/student/:id', getStudent);
router.get('/student/user/:id', getStudentByUser);
router.put('/student/update/:id', updateProfile);

export default router;
