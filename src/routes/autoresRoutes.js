import express from "express";
import AutorController from "../controllers/autorController";

const router = express.Router()

router
    .get('/autores', AutorController.listarAutores)
    .get('/autores/:id', AutorController.listarAutorPorId)
    .post('/autores', AutorController.criarAutor)
    .put('/autores/:id', AutorController.atualizarAutor)
    .delete('/autores/:id', AutorController.exluirAutor)

export default router