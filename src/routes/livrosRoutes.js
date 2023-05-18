import express from "express";
import LivroController from "../controllers/livrosController";

const router = express.Router()

router
    .get('/livros', LivroController.listarLivros)
    .get('/livros/busca', LivroController.listarLivroPorEditora)
    .get('/livros/:id', LivroController.listarLivroPorId)
    .post('/livros', LivroController.criarLivro)
    .put('/livros/:id', LivroController.atualizarLivro)
    .delete('/livros/:id', LivroController.exluirLivro)

export default router