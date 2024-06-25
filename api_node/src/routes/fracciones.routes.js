import { Router } from "express";
import { buscarFracciones, deleteFraccion, getFraccion, getFracciones, postFraccion, putFraccion } from "../controllers/fracciones.controller.js";

const router = Router()

router.get('/fraccion', getFracciones)

router.get('/fraccion/:id_fraccion', getFraccion)

router.get('/fracciones/busqueda', buscarFracciones)

router.post('/fraccion/crear', postFraccion)

router.put('/fraccion/editar/:id_fraccion', putFraccion)

router.delete('/fraccion/borrar/:id_fraccion', deleteFraccion)

export default router