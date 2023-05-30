"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var autorController_1 = __importDefault(require("../controllers/autorController"));
var router = express_1.default.Router();
router
    .get('/autores', autorController_1.default.listarAutores)
    .get('/autores/:id', autorController_1.default.listarAutorPorId)
    .post('/autores', autorController_1.default.criarAutor)
    .put('/autores/:id', autorController_1.default.atualizarAutor)
    .delete('/autores/:id', autorController_1.default.exluirAutor);
exports.default = router;
