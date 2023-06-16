"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRoutes_js_1 = __importDefault(require("./usersRoutes.js"));
const jamsRoutes_js_1 = __importDefault(require("./jamsRoutes.js"));
const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ titulo: 'backend ctjam, url raiz sem parametros' });
    });
    app.use(express_1.default.json(), usersRoutes_js_1.default, jamsRoutes_js_1.default);
};
exports.default = routes;
