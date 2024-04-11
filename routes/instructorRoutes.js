import express from 'express';

import {
    getInstructors,
    addInstructor,
    getCoursesByInstructor
} from '../controllers/instructorController.js';

const router = express.Router();

router.get('/instructor', getInstructors);
router.post('/instructor', addInstructor);
router.get('/instructor/:id', getCoursesByInstructor);

export default router;