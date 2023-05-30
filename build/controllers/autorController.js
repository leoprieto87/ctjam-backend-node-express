"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Autor_1 = __importDefault(require("../models/Autor"));
var AutorController = /** @class */ (function () {
    function AutorController() {
    }
    AutorController.listarAutores = function (req, res) {
        Autor_1.default.find(function (err, autores) {
            res.status(200).json(autores);
            console.log(err);
        });
    };
    AutorController.listarAutorPorId = function (req, res) {
        var id = req.params.id;
        Autor_1.default.findById(id, function (err, autores) {
            if (err) {
                res.status(400).send({ message: "".concat(err.message, " id do Autor n\u00E3o encontrado") });
            }
            else {
                res.status(200).send(autores);
            }
        });
    };
    AutorController.criarAutor = function (req, res) {
        var autor = new Autor_1.default(req.body);
        autor.save(function (err) {
            if (err) {
                res.status(500).send({ message: "N\u00E3o conseguiu gravar no servidor: ".concat(err.message) });
            }
            else {
                res.status(201).send(Autor_1.default.toJSON);
            }
        });
    };
    AutorController.atualizarAutor = function (req, res) {
        var id = req.params.id;
        Autor_1.default.findByIdAndUpdate(id, { $set: req.body }, function (err) {
            if (!err) {
                res.status(200).send({ message: 'Autor atualizado com sucesso' });
            }
            else {
                res.status(500).send({ message: err.message });
            }
        });
    };
    AutorController.exluirAutor = function (req, res) {
        var id = req.params.id;
        Autor_1.default.findByIdAndDelete(id, function (err) {
            if (!err) {
                res.status(200).send({ message: "Autor ".concat(id, " excluido com sucesso") });
            }
            else {
                res.status(500).send({ message: err.message });
            }
        });
    };
    return AutorController;
}());
exports.default = AutorController;
