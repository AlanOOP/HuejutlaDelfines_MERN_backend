import express from 'express';
import multer from 'multer';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
// Importamos el controlador
import {
    addCourse,
    getCourses,
    getCourse,
    updateCourse,
    activateCourse,
    desactivateCourse,
    searchCourse,
    searchCourseCategory
} from '../controllers/courseController.js';

const router = express.Router();


// Configuramos multer


const __dirname = dirname(fileURLToPath(import.meta.url));
let basePath = path.resolve(__dirname + "../../") + "/public/uploads";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, basePath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get('/courses', getCourses);
router.get('/courses/:id', getCourse);
router.post('/courses', upload.any(), addCourse);
router.put('/courses/:id', upload.any(), updateCourse);
router.put('/courses/activate/:id', activateCourse);
router.put('/courses/desactivate/:id', desactivateCourse);
//request query
router.post('/courses/search', searchCourse);
router.post('/courses/search/category', searchCourseCategory);

export default router;