"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_js_1 = __importDefault(require("../controllers/usersController.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router
    .get('/users', usersController_js_1.default.listUsers)
    .post('/users/login/authToken', usersController_js_1.default.loginUser)
    .post('/users/login/authUser/:id', checkToken, usersController_js_1.default.listUserById)
    .get('/users/:id', usersController_js_1.default.listUserById)
    .post('/users/register', usersController_js_1.default.createUser)
    .put('/users/update/:id', usersController_js_1.default.updateUser)
    .delete('/users/delete/:id', usersController_js_1.default.deleteUser);
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Acesso negado!' });
    }
    try {
        const secret = process.env.SECRET;
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        res.status(400).send({ message: 'Token inválido!' });
    }
}
exports.default = router;
