"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var livrosController_1 = __importDefault(require("../controllers/livrosController"));
var router = express_1.default.Router();
router
    .get('/livros', livrosController_1.default.listarLivros)
    .get('/livros/busca', livrosController_1.default.listarLivroPorEditora)
    .get('/livros/:id', livrosController_1.default.listarLivroPorId)
    .post('/livros', livrosController_1.default.criarLivro)
    .put('/livros/:id', livrosController_1.default.atualizarLivro)
    .delete('/livros/:id', livrosController_1.default.exluirLivro);
exports.default = router;
