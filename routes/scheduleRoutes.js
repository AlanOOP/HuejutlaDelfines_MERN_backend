import express from 'express';
import {
    getSchedules,
    getSchedulesHour7,
    createSchedule
} from '../controllers/scheduleController.js';

const router = express.Router();

router.get('/schedule', getSchedules);
router.get('/schedule/7', getSchedulesHour7);
router.post('/schedule', createSchedule);

export default router;
