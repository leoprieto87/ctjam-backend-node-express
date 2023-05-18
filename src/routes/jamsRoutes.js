import express from "express";
import JamController from "../controllers/jamsController";

const router = express.Router()

router
    .get('/jams', JamController.listJams)
    // .get('/livros/busca', JamController.listarJamPorEditora) //usar para buscar por tema, etc
    .get('/jams/:id', JamController.listJamById)
    .post('/jams', JamController.createJam)
    .put('/jams/:id', JamController.updateJam)
    .delete('/jams/:id', JamController.deleteJam)

export default router