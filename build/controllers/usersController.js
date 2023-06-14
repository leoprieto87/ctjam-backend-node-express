"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../models/User"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    var _a;
    _a = UsersController;
    UsersController.listUsers = function (req, res) {
        User_1.default.find(req, '-password -phone', function (err, users) {
            res.status(200).json(users);
        });
    };
    UsersController.listUserById = function (req, res) {
        var id = req.params.id;
        User_1.default.findById(id, '-password -phone', function (err, users) {
            if (err) {
                res.status(400).send({
                    message: "".concat(err.message, " id do Usu\u00E1rio n\u00E3o encontrado")
                });
            }
            else {
                res.status(200).send(users);
            }
        });
    };
    UsersController.createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        function verififyIfUserExistsAndCreate(email) {
            return __awaiter(this, void 0, void 0, function () {
                var userToVerify, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, User_1.default.findOne({
                                    email: email // Procura um usuário com o email fornecido
                                })];
                        case 1:
                            userToVerify = _b.sent();
                            if (userToVerify) {
                                res.status(403).send({
                                    message: "Usu\u00E1rio j\u00E1 cadastrado"
                                });
                                return [2 /*return*/, true]; // O usuário já está cadastrado
                            }
                            else {
                                user.password = passwordHash;
                                user.save(function (err) {
                                    if (err) {
                                        res.status(500).send({
                                            message: "Erro ao criar usu\u00E1rio: ".concat(err.message)
                                        });
                                    }
                                    else {
                                        res.status(201).send(User_1.default.toJSON);
                                    }
                                });
                                return [2 /*return*/, null]; // O usuário não está cadastrado e pode ser incluído ao banco
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _b.sent();
                            res.status(400).send({
                                message: "".concat(error_1, " Erro ao verificar usu\u00E1rio")
                            });
                            return [2 /*return*/, false]; // Ocorreu um erro durante a verificação
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        var user, salt, passwordHash, userEmailRequest;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    user = new User_1.default(req.body);
                    return [4 /*yield*/, bcrypt_1.default.genSalt(12)];
                case 1:
                    salt = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(user.password, salt)];
                case 2:
                    passwordHash = _b.sent();
                    userEmailRequest = user.email;
                    verififyIfUserExistsAndCreate(userEmailRequest);
                    return [2 /*return*/];
            }
        });
    }); };
    UsersController.updateUser = function (req, res) {
        var id = req.params.id;
        User_1.default.findByIdAndUpdate(id, {
            $set: req.body
        }, function (err) {
            if (!err) {
                res.status(200).send({
                    message: 'Usuário atualizado com sucesso'
                });
            }
            else {
                res.status(500).send({
                    message: err.message
                });
            }
        });
    };
    UsersController.deleteUser = function (req, res) {
        var id = req.params.id;
        User_1.default.findByIdAndDelete(id, function (err) {
            if (!err) {
                res.status(200).send({
                    message: "Usu\u00E1rio ".concat(id, " exclu\u00EDdo com sucesso")
                });
            }
            else {
                res.status(500).send({
                    message: err.message
                });
            }
        });
    };
    UsersController.loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, email, password, user, checkPassword, secret, token;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, email = _b.email, password = _b.password;
                    if (!(email && password)) return [3 /*break*/, 5];
                    return [4 /*yield*/, User_1.default.findOne({ email: email })];
                case 1:
                    user = _c.sent();
                    if (!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    checkPassword = _c.sent();
                    if (!checkPassword) { //CHECK IF PASSWORD MATCH
                        res.status(404).send({ message: "Senha Invalida" });
                    }
                    else {
                        try {
                            secret = process.env.SECRET;
                            token = jsonwebtoken_1.default.sign({
                                id: user._id,
                            }, secret) //send token and id
                            ;
                            res.status(200).send({ message: "Logado com sucesso", userId: user._id, token: token });
                        }
                        catch (error) {
                            res.status(500).send({ message: "Aconteceu algum erro no servidor, tente novamente." });
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    res.status(404).send({ message: "usuario nao encontrado" });
                    _c.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    res.status(400).send({ message: "\u00C9 obrigat\u00F3rio digitar e-mail e senha para efetuar login" });
                    _c.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    UsersController.listLoggedUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, user;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, User_1.default.findById(id, '-password')];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(404).send({ message: 'Usuário não encontrado' })];
                    }
                    res.status(200).send(user);
                    return [2 /*return*/];
            }
        });
    }); };
    return UsersController;
}());
exports.default = UsersController;
