import { Router } from "express";
import { deleteUbicacion, getUbicacion, getUbicaciones, postUbicacion, putUbicacion } from "../controllers/ubicaciones.controller.js";

const router = Router()

router.get('/ubicacion', getUbicaciones)

router.get('/ubicacion/:id_ubicacion', getUbicacion)

router.post('/ubicacion/crear', postUbicacion)

router.put('/ubicacion/editar/:id_ubicacion', putUbicacion)

router.delete('/ubicacion/borrar/:id_ubicacion', deleteUbicacion)

export default router