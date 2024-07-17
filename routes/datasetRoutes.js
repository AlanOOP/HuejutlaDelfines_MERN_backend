import express from 'express';

import {
    getDataset
} from '../controllers/datasetController.js';

const router = express.Router();

router.get('/dataset', getDataset);


export default router;