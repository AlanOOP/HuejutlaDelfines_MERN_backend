import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

export default Schedule;