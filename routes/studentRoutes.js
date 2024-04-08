import express from 'express';

import {
    getStudents,
    getStudent,
    getStudentByUser
} from '../controllers/studentController.js'

const router = express.Router();

router.get('/student', getStudents);
router.get('/student/:id', getStudent);
router.get('/student/user/:id', getStudentByUser);

export default router;
