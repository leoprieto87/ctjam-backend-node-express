"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var autorSchema = new mongoose_1.default.Schema({
    id: { type: String },
    name: { type: String, required: true },
    nationality: { type: String, required: true }
}, {
    versionKey: false
});
var autores = mongoose_1.default.model('autores', autorSchema);
exports.default = autores;
