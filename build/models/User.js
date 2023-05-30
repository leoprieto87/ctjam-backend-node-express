"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var usersSchema = new mongoose_1.default.Schema({
    id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    instagram: { type: String },
    instrument: { type: String, required: true },
    leftHanded: { type: Boolean, required: true },
    musicStyle: { type: String },
    nickname: { type: String, required: true },
    phone: { type: String, required: true }
}, {
    versionKey: false
});
var users = mongoose_1.default.model('users', usersSchema);
exports.default = users;
