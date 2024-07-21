import express from 'express';
import {
    getSchedules,
    getSchedulesHour7,
    createSchedule,
    updateSchedule,
    deleteSchedule
} from '../controllers/scheduleController.js';

const router = express.Router();

router.get('/schedule', getSchedules);
router.get('/schedule/7', getSchedulesHour7);
router.post('/schedule', createSchedule);
router.put('/schedule/:id', updateSchedule);
router.delete('/schedule/:id', deleteSchedule);

export default router;
