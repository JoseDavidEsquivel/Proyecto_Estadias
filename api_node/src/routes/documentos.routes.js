import { Router } from "express";
import { borrarDocumento, getDocumento, getDocumentos, postDocumento } from "../controllers/documentos.controller.js";

import multer from 'multer';

const router = Router()
const upload = multer({ dest: 'src/static/temp/' });


router.get('/documento', getDocumentos)

router.get('/documento/:id_documento', getDocumento)

router.post('/documento/crear', upload.single('file'), postDocumento)
// aqui en el body que tienes que enviar a este endpoint como js no reconoce la ñ pues para enviar el campo de año se cambia por periodo

router.delete('/documento/borrar/:id_documento', borrarDocumento)

export default router