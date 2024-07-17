import express from 'express';

import {
    getPreparedDataset
} from '../controllers/datasetController.js';

const router = express.Router();

router.get('/dataset', getPreparedDataset);


export default router;