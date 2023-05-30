"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Livro_1 = __importDefault(require("../models/Livro"));
var LivroController = /** @class */ (function () {
    function LivroController() {
    }
    LivroController.listarLivros = function (req, res) {
        Livro_1.default.find()
            .populate('autor', 'name')
            .exec(function (err, livros) {
            res.status(200).json(livros);
        });
    };
    LivroController.listarLivroPorId = function (req, res) {
        var id = req.params.id;
        Livro_1.default.findById(id)
            .populate('autor', 'name')
            .exec(function (err, livros) {
            if (err) {
                res.status(400).send({ message: "".concat(err.message, " id do livro n\u00E3o encontrado") });
            }
            else {
                res.status(200).send(livros);
            }
        });
    };
    LivroController.criarLivro = function (req, res) {
        var livro = new Livro_1.default(req.body);
        livro.save(function (err) {
            if (err) {
                res.status(500).send({ message: "N\u00E3o conseguiu gravar no servidor: ".concat(err.message) });
            }
            else {
                res.status(201).send(livro.toJSON);
            }
        });
    };
    LivroController.atualizarLivro = function (req, res) {
        var id = req.params.id;
        Livro_1.default.findByIdAndUpdate(id, { $set: req.body }, function (err) {
            if (!err) {
                res.status(200).send({ message: 'Livro atualizado com sucesso' });
            }
            else {
                res.status(500).send({ message: err.message });
            }
        });
    };
    LivroController.exluirLivro = function (req, res) {
        var id = req.params.id;
        Livro_1.default.findByIdAndDelete(id, function (err) {
            if (!err) {
                res.status(200).send({ message: "Livro ".concat(id, " excluido com sucesso") });
            }
            else {
                res.status(500).send({ message: err.message });
            }
        });
    };
    LivroController.listarLivroPorEditora = function (req, res) {
        var editora = req.query.editora;
        Livro_1.default.find({ 'editora': editora }, {}, function (err, livros) {
            res.status(200).send(livros);
        });
    };
    return LivroController;
}());
exports.default = LivroController;
