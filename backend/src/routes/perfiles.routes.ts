import { Router } from "express";
import {
  crearPerfil,
  obtenerPerfiles,
  actualizarPerfil,
  eliminarPerfil,
  seleccionarPerfil
} from "../controllers/perfiles.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", obtenerPerfiles);
router.post("/", crearPerfil);
router.put("/:index", actualizarPerfil);
router.delete("/:index", eliminarPerfil);
router.post("/seleccionar", seleccionarPerfil);

export default router;