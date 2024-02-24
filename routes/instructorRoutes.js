import express from 'express';

import {
    getInstructors,
    addInstructor
} from '../controllers/instructorController.js';

const router = express.Router();

router.get('/instructor', getInstructors);
router.post('/instructor', addInstructor);

export default router;