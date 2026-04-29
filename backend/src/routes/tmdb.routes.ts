import { Router } from "express";
import { perfilMiddleware } from "../middlewares/perfil.middleware";
import {
  trending,
  moviesPopular,
  seriesPopular
} from "../controllers/tmdb.controller";

const router = Router();

router.use(perfilMiddleware);

router.get("/trending", trending);
router.get("/movies/popular", moviesPopular);
router.get("/series/popular", seriesPopular);

export default router;