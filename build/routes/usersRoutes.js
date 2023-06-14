"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usersController_1 = __importDefault(require("../controllers/usersController"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var router = express_1.default.Router();
router
    .get('/users', usersController_1.default.listUsers)
    .post('/users/login/authToken', usersController_1.default.loginUser)
    .post('/users/login/authUser/:id', checkToken, usersController_1.default.listUserById)
    .get('/users/:id', usersController_1.default.listUserById)
    .post('/users/register', usersController_1.default.createUser)
    .put('/users/update/:id', usersController_1.default.updateUser)
    .delete('/users/delete/:id', usersController_1.default.deleteUser);
function checkToken(req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Acesso negado!' });
    }
    try {
        var secret = process.env.SECRET;
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        res.status(400).send({ message: 'Token inválido!' });
    }
}
exports.default = router;
