import express from 'express';
import multer from 'multer';

import {
    getCompetences,
    getCompetenceById,
    addCompetence,
    updateCompetence,
    deleteCompetence
} from '../controllers/competenceController.js';

const router = express.Router();

const storage = multer.diskStorage({})

const upload = multer({ storage });


router.get('/competences', getCompetences);
router.get('/competences/:id', getCompetenceById);
router.post('/competences', upload.single('img'), addCompetence);
router.put('/competences/:id', upload.single('img'), updateCompetence);
router.delete('/competences/:id', deleteCompetence);


export default router;