import express from 'express';
import {
    getGalery,
    createGalery,
    deleteGalery
} from '../controllers/galeryController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, './public/uploads/')
    // },
    // filename: function (req, file, cb) {
    //     cb(null, Math.random() + path.extname(file.originalname))
    // }
})

const upload = multer({ storage });

router.get('/galery', getGalery);
router.post('/galery', upload.single('img'), createGalery);
router.delete('/galery/:id', deleteGalery);

export default router;

