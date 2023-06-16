"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jamsController_js_1 = __importDefault(require("../controllers/jamsController.js"));
const router = express_1.default.Router();
router
    .get('/jams', jamsController_js_1.default.listJams)
    // .get('/livros/busca', JamController.listarJamPorEditora) //usar para buscar por tema, etc
    .get('/jams/:id', jamsController_js_1.default.listJamById)
    .post('/jams/create', jamsController_js_1.default.createJam)
    .put('/jams/update/:id', jamsController_js_1.default.updateJam)
    .put('/jams/addSongToJamPlayList/:id', jamsController_js_1.default.addSongToJamPlayList)
    .put('/jam/:jamId/playList/:playlistItemId', jamsController_js_1.default.updateSongById)
    .delete('/jams/:id', jamsController_js_1.default.deleteJam);
exports.default = router;
