import { Router } from "express";
import { deleteAviso, getAviso, getAvisos, getAvisosActivos, postAviso, putAviso } from "../controllers/avisos.controller.js";

import multer from 'multer';

const router = Router()
const upload = multer({ dest: 'src/static/temp/' });

router.get('/avisos', getAvisos)

router.get('/avisos/activos', getAvisosActivos)

router.get('/aviso/:id_aviso', getAviso)

router.post('/aviso/crear', upload.single('file'), postAviso )

router.put('/aviso/editar/:id_aviso', upload.single('file'), putAviso )

router.delete('/aviso/borrar/:id_aviso', deleteAviso)

export default router