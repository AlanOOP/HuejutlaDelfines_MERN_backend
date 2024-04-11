import express from 'express';

import {
    addSecretQuestion,
    getSecretQuestionByUser,
    compareSecretQuestion
} from '../controllers/secretQuestionController.js';

const router = express.Router();

router.post('/secretQuestion/:id', addSecretQuestion);
router.post('/secretQuestionByEmail', getSecretQuestionByUser);
router.post('/secretQuestion/compare/:id', compareSecretQuestion);

export default router;