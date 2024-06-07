import { Router } from "express";
import { deleteAño, getAño, getAños } from "../controllers/años.controller.js";

const router = Router()

router.get('/anual', getAños)

router.get('/anual/:id', getAño)

router.get('/anual/borrar/:id', deleteAño)

export default router