import { Router } from "express";
import { listar, detalhes } from "../controllers/livroController.js";


const router = Router();
router.get("/livros", listar);
router.get("/livros/:id", detalhes);


export default router;