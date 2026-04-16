import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadAvatar } from "../middlewares/uploadAvatar";

import {
  crearPerfil,
  obtenerPerfiles,
  actualizarPerfil,
  eliminarPerfil,
  seleccionarPerfil
} from "../controllers/perfiles.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", obtenerPerfiles);
router.post("/", authMiddleware, uploadAvatar.single("avatar"), crearPerfil);
router.put("/:index", actualizarPerfil);
router.delete("/:index", eliminarPerfil);
router.post("/seleccionar", seleccionarPerfil);

export default router;