import { Router } from "express";
import { deleteBot, detalleBot, listarBot, postBot, putBot } from "../controllers/bot.controller.js";

const router = Router()

router.get('/bot', listarBot)

router.get('/bot/:id_bot', detalleBot)

router.post('/bot/crear', postBot)

router.put('/bot/editar/:id_bot', putBot)

router.delete('/bot/borrar/:id_bot', deleteBot)

export default router