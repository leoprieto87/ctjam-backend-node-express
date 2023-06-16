"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
mongoose_1.default.connect(`mongodb://ctjam01:jam123@mongo71-farm10.kinghost.net:27017/ctjam01`);
// mongodb://ctjam01:jam123@mongo71-farm10.kinghost.net:27017/ctjam01?authSource=ctjam01
const db = mongoose_1.default.connection;
exports.default = db;
