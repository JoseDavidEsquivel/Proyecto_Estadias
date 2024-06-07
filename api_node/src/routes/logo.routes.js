import { Router } from 'express';
import multer from 'multer';
import { getLogos, subirLogo, borrarLogo } from '../controllers/logo.controller.js';

const router = Router();
const upload = multer();

router.post('/logo/subir', upload.single('file'), subirLogo);

router.get('/logo', getLogos); // Asumiendo que ya tienes el endpoint para obtener logos

router.post('/logo/borrar', borrarLogo);

export default router;
