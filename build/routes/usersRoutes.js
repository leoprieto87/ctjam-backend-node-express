"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usersController_1 = __importDefault(require("../controllers/usersController"));
var router = express_1.default.Router();
router
    .get('/users', usersController_1.default.listUsers)
    .get('/users/:id', usersController_1.default.listUserById)
    .post('/users', usersController_1.default.createUser)
    .put('/users/:id', usersController_1.default.updateUser)
    .delete('/users/:id', usersController_1.default.deleteUser);
exports.default = router;
