import {
    getEvaluationsByStudent,
    updateEvaluation,
    createEvaluation,
} from '../controllers/studentEvaluationController.js';
import express from 'express';

const router = express.Router();

router.post('/evaluation/:studentId', getEvaluationsByStudent);
router.put('/evaluation/:id', updateEvaluation);
router.post('/evaluation-create/:studentId', createEvaluation);


export default router;