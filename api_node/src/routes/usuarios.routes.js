import { Router } from "express";
import { getUsuarios, getUsuario, postUsuario , putUsuario ,deleteUsuario} from "../controllers/usuarios.controller.js";

const router = Router()

router.get('/usuario', getUsuarios)

router.get("/usuario/:id_usuario", getUsuario)

router.post("/usuario/crear", postUsuario)

router.put("/usuario/editar/:id_usuario",putUsuario )

router.delete("/usuario/borrar/:id_usuario",deleteUsuario )

export default router