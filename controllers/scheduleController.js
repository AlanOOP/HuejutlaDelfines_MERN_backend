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
        res.status(200).json(newSchedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSchedule = async (req, res) => {
    const { id } = req.params;
    const { day, hour } = req.body;

    try {
        if (!id) {
            const error = new Error('No se ha encontrado el id');
            return res.status(404).json(error.message);
        }

        const schedule = await Schedule.findById(id);

        if (!schedule) {
            const error = new Error('No se ha encontrado el horario');
            return res.status(404).json(error.message);
        }

        schedule.day = day;
        schedule.hour = hour;

        await schedule.save();

        res.status(200).json(schedule);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const deleteSchedule = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            const error = new Error('No se ha encontrado el id');
            return res.status(404).json(error.message);
        }

        const schedule = await Schedule.findById(id);

        if (!schedule) {
            const error = new Error('No se ha encontrado el horario');
            return res.status(404).json(error.message);
        }

        await Schedule.findByIdAndDelete(id);

        res.status(200).json({ message: 'Horario eliminado' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export {
    getSchedules,
    getSchedulesHour7,
    createSchedule,
    updateSchedule,
    deleteSchedule
};