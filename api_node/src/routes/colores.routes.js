import { Router } from "express";
import { deleteColor, getColor, getColores, postColor, putColor } from "../controllers/colores.controller.js";

const router = Router()

router.get('/color', getColores)

router.get('/color/:id_color', getColor)

router.post('/color/crear', postColor)

router.put('/color/editar/:id_color', putColor)

router.delete('/color/borrar/:id_color', deleteColor)

export default router