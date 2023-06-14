"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var mongoose_1 = __importDefault(require("mongoose"));
var dbUser = process.env.DB_USER;
var dbPassword = process.env.DB_PASSWORD;
mongoose_1.default.connect("mongodb://".concat(dbUser, ":").concat(dbPassword, "@mongo71-farm10.kinghost.net:27017/").concat(dbUser));
// mongodb://ctjam01:jam123@mongo71-farm10.kinghost.net:27017/ctjam01?authSource=ctjam01
var db = mongoose_1.default.connection;
exports.default = db;
