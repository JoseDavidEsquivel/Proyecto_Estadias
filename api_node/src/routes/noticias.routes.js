import { Router } from "express";
import { deleteNoticia, getNoticia, getNoticias, postNoticia, putNoticia } from "../controllers/noticias.controller.js";

import multer from 'multer';

const router = Router()
const upload = multer({ dest: 'src/static/temp/' });

router.get('/noticia', getNoticias)

router.get('/noticia/:id_noticia', getNoticia)

router.post('/noticia/crear',  upload.single('file'), postNoticia)

router.put('/noticia/editar/:id_noticia',  upload.single('file'), putNoticia)

router.delete('/noticia/borrar/:id_noticia', deleteNoticia )

export default router