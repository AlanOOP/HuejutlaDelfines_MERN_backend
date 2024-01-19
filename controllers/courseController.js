import { fileURLToPath } from 'url';
import Courses from "../models/Courses.js";
import fs from "fs";
import path, { dirname } from "path";

// Get all courses

const deleteImages = (images, mode) => {

    const __dirname = dirname(fileURLToPath(import.meta.url));
    let basePath = path.resolve(__dirname + "../../") + "/public/uploads/";

    for (let i = 0; i < images.length; i++) {
        let filePath = "";
        if (mode == "file") {
            filePath = basePath + `${images[i].filename}`;
        } else {
            filePath = basePath + `${images[i]}`;
        }
        console.log(filePath);
        if (fs.existsSync(filePath)) {
            console.log("Exists image");
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
        const courses = await Courses.find();
        res.json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get single course

const getCourse = async (req, res, next) => {
    try {
        const course = await Courses.findById(req.params.id);

        if (!course) {
            res.status(404).json({ message: "Course not found" });
            next();
        }
        res.json(course);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Create new course

const addCourse = async (req, res, next) => {
    try {
        const { title, description, category, price, offer } = req.body;

        let images = req.files;
        // console.log(req.files);

        // console.log(title);
        // console.log(images);

        if (!title || !description || !category || !images || !price || !offer) {
            deleteImages(images, "file");
            return res.status(400).json({ message: "Campos Requeridos" });

        } 
        if (images.length !== 2) {
            deleteImages(images, "file");
            return res.status(400).json({ message: "Se requiere 2 imagenes" });
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
                active: true
            }
        );

        await course.save();
        res.json({ message: "Course created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Update course

const updateCourse = async (req, res, next) => {
    try {
        const { title, description, category, hours, image, price } = req.body;

        if (!title || !description || !category || !hours || !image || !price) {
            res.status(400).json({ message: "Campos Requeridos" });
            next();
        }

        const course = await Courses.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Curso Actualizado Correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Desactivate course

const desactivateCourse = async (req, res, next) => {
    try {
        const course = await Courses.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        res.json({ message: "Curso Desactivado Correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Activate course

const activateCourse = async (req, res, next) => {
    try {
        const course = await Courses.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
        res.json({ message: "Curso Activado Correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    desactivateCourse,
    activateCourse
};
