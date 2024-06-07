import { Router } from "express";
import { deleteArticulo, getArticulo, getArticulos, postArticulo, putArticulo } from "../controllers/articulos.controller.js";

const router = Router()

router.get('/articulo', getArticulos)

router.get('/articulo/:id_articulo', getArticulo)

router.post('/articulo/crear', postArticulo)

router.put('/articulo/editar/:id_articulo', putArticulo)

router.delete('/articulo/borrar/:id_articulo', deleteArticulo)

export default router