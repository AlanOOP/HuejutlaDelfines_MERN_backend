import express from 'express';
import multer from 'multer';

// Importamos el controlador
import {
    addCourse,
    getCourses,
    getCourse,
    updateCourse,
    activateCourse,
    desactivateCourse,
} from '../controllers/courseController.js';

const router = express.Router();

// Configuramos multer

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
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

export default router;