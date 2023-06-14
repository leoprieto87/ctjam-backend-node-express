"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var port = process.env.PORT || 21041;
exports.default = app_1.default.listen(port, function () {
    console.log("Servidor escutando em http://localhost:".concat(port));
});
