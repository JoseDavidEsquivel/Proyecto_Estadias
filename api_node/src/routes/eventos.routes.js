import { Router } from "express";
import { deleteEvento, getEvento, getEventos, postEvento, putEvento } from "../controllers/eventos.controller.js";

const router = Router()

router.get('/evento', getEventos)

router.get('/evento/:id_evento', getEvento)

router.post('/evento/crear', postEvento)

router.put('/evento/editar/:id_evento', putEvento)

router.delete('/evento/borrar/:id_evento', deleteEvento)

export default router