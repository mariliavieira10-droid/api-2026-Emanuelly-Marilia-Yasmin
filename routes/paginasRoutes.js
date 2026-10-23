import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => res.render("login", { titulo: "Entrar" }));
router.get("/cadastro", (req, res) =>
  res.render("login", { titulo: "Criar conta" }),
);

export default router;