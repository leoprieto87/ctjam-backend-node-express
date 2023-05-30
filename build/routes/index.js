"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var livrosRoutes_1 = __importDefault(require("./livrosRoutes"));
var autoresRoutes_1 = __importDefault(require("./autoresRoutes"));
var usersRoutes_1 = __importDefault(require("./usersRoutes"));
var jamsRoutes_1 = __importDefault(require("./jamsRoutes"));
var routes = function (app) {
    app.route('/').get(function (req, res) {
        res.status(200).send({ titulo: 'Curso de node, url raiz' });
    });
    app.use(express_1.default.json(), livrosRoutes_1.default, autoresRoutes_1.default, usersRoutes_1.default, jamsRoutes_1.default);
};
exports.default = routes;
