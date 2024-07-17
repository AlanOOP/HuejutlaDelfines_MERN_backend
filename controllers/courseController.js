import { fileURLToPath } from 'url';
import Courses from "../models/Courses.js";
import fs from "fs";
import path, { dirname } from "path";
import Instructor from '../models/Instructor.js';

// Get all courses

const deleteImages = (images, mode) => {

    const __dirname = dirname(fileURLToPath(import.meta.url));
    let basePath = path.resolve(__dirname + "../../") + "uploads/";

    for (let i = 0; i < images.length; i++) {
        let filePath = "";
        if (mode === "file") {
            filePath = basePath + `${images[i].filename}`;
        } else {
            filePath = basePath + `${images[i]}`;
        }
        // console.log(filePath);
        if (fs.existsSync(filePath)) {
            // console.log("Exists image");
            console.log("existe");
        }
        fs.unlink(filePath, (err) => {
            if (err) {
                return err;
            }
        });
    }
}

const getCourses = async (req, res) => {
    try {
        const courses = await Courses.find().populate("instructor");
        res.json(courses);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get single course

const getCourse = async (req, res) => {
    try {
        const course = await Courses.findById(req.params.id);

        if (!course) {
            const error = new Error("No se encontro el curso");
            return res.status(404).json({ message: error.message });
        }
        return res.json(course);

    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Create new course

const addCourse = async (req, res) => {
    try {
        const { title, description, category, price, offer, instructor, cupos } = req.body;

        console.log(req.body);

        let images = req.files;
        // console.log(req.files);

        // console.log(title);
        console.log(images);

        if (!title || !description || !category || !price || !offer) {
            deleteImages(images, "file");
            return res.status(400).json({ message: "Campos Requeridos" });
        }
        if (images.length !== 2) {
            deleteImages(images, "file");
            return res.status(400).json({ message: "Se requiere 2 imagenes" });
        }

        const existInstructor = await Instructor.findById(instructor);

        if (!existInstructor) {
            deleteImages(images, "file");
            const error = new Error("Instructor no encontrado");
            return res.status(404).json(error.message);
        }

        let allImages = [];

        for (const img of images) {
            allImages.push(img.filename);
        }

        const course = new Courses(
            {
                title,
                description,
                category,
                image: allImages,
                price,
                offer,
                active: true,
                instructor,
                cupos
            }
        );

        await course.save();
        res.json({ message: "Course created successfully" });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Update course

const updateCourse = async (req, res) => {
    try {
        const { title, description, category, hours, image, price } = req.body;
        if (!title || !description || !category || !hours || !image || !price) {
            res.status(400).json({ message: "Campos Requeridos" });
        }
        await Courses.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Curso Actualizado Correctamente" });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Desactivate course

const desactivateCourse = async (req, res) => {
    try {
        await Courses.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        res.json({ message: "Curso Desactivado Correctamente" });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Activate course

const activateCourse = async (req, res) => {
    try {
        await Courses.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
        res.json({ message: "Curso Activado Correctamente" });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}


//buscar curso por nombre 

const searchCourse = async (req, res) => {

    // console.log(req.query);

    try {
        const { title } = req.query;
        const course = await Courses.find({ title: { $regex: title, $options: "i" } });
        if (!course) {
            const error = new Error("No se encontro el curso");
            return res.status(404).json({ message: error.message });
        }

        res.json(course);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//buscar por categoria , activo o inactivo

const searchCourseCategory = async (req, res) => {

    // console.log(req.query);

    try {
        const { category, active } = req.query;
        const course = await Courses.find({ category: category, active: active });
        if (!course) {
            const error = new Error("No se encontro el curso");
            return res.status(404).json({ message: error.message });
        }
        res.json(course);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}


export {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    desactivateCourse,
    activateCourse,
    searchCourse,
    searchCourseCategory
};
