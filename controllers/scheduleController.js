import Schedule from "../models/Schedule.js";

const getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getSchedulesHour7 = async (req, res) => {
    try {
        const schedules = await Schedule.find({ hour: "7:00" });
        res.status(200).json(schedules);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createSchedule = async (req, res) => {
    const schedule = req.body;
    const newSchedule = new Schedule(schedule);

    try {
        await newSchedule.save();
        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export { getSchedules, getSchedulesHour7, createSchedule };