"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Jams_1 = __importDefault(require("../models/Jams"));
var populateOptions = [
    { path: 'playList.usersBand.vocal', select: 'name' },
    { path: 'playList.usersBand.guitar', select: 'name' },
    { path: 'playList.usersBand.guitar2', select: 'name' },
    { path: 'playList.usersBand.bass', select: 'name' },
    { path: 'playList.usersBand.drums', select: 'name' },
    { path: 'playList.usersBand.keys', select: 'name' }
];
var JamController = /** @class */ (function () {
    function JamController() {
    }
    JamController.listJams = function (req, res) {
        Jams_1.default.find()
            .populate(populateOptions)
            .exec(function (err, jams) {
            res.status(200).json(jams);
        });
    };
    JamController.listJamById = function (req, res) {
        var id = req.params.id;
        Jams_1.default.findById(id)
            .populate(populateOptions)
            .exec(function (err, jams) {
            if (err) {
                res.status(400).send({ message: "".concat(err.message, " id da jam n\u00E3o encontrado") });
            }
            else {
                res.status(200).send(jams);
            }
        });
    };
    JamController.createJam = function (req, res) {
        var livro = new Jams_1.default(req.body);
        livro.save(function (err) {
            if (err) {
                res.status(500).send({ message: "N\u00E3o conseguiu gravar no servidor: ".concat(err.message) });
            }
            else {
                res.status(201).send(livro.toJSON);
            }
        });
    };
    JamController.updateJam = function (req, res) {
        var id = req.params.id;
        Jams_1.default.findByIdAndUpdate(id, { $set: req.body }, function (err) {
            if (!err) {
                res.status(200).send({ message: 'Jam atualizado com sucesso' });
            }
            else {
                res.status(500).send({ message: err.message });
            }
        });
    };
    JamController.deleteJam = function (req, res) {
        var id = req.params.id;
        Jams_1.default.findByIdAndDelete(id, function (err) {
            if (!err) {
                res.status(200).send({ message: "Jam ".concat(id, " excluida com sucesso") });
            }
            else {
                res.status(500).send({ message: err.message });
            }
        });
    };
    return JamController;
}());
exports.default = JamController;
