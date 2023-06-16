"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const User_js_1 = __importDefault(require("../models/User.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UsersController {
}
_a = UsersController;
UsersController.listUsers = (req, res) => {
    User_js_1.default.find(req, '-password -phone', (err, users) => {
        res.status(200).json(users);
    });
};
UsersController.listUserById = (req, res) => {
    const id = req.params.id;
    User_js_1.default.findById(id, '-password -phone', (err, users) => {
        if (err) {
            res.status(400).send({
                message: `${err.message} id do Usuário não encontrado`
            });
        }
        else {
            res.status(200).send(users);
        }
    });
};
UsersController.createUser = async (req, res) => {
    // let userRequest = req.body
    let user = new User_js_1.default(req.body);
    const salt = await bcrypt_1.default.genSalt(12);
    const passwordHash = await bcrypt_1.default.hash(user.password, salt);
    async function verififyIfUserExistsAndCreate(email) {
        try {
            const userToVerify = await User_js_1.default.findOne({
                email: email // Procura um usuário com o email fornecido
            });
            if (userToVerify) {
                res.status(403).send({
                    message: `Usuário já cadastrado`
                });
                return true; // O usuário já está cadastrado
            }
            else {
                user.password = passwordHash;
                user.save((err) => {
                    if (err) {
                        res.status(500).send({
                            message: `Erro ao criar usuário: ${err.message}`
                        });
                    }
                    else {
                        res.status(201).send(User_js_1.default.toJSON);
                    }
                });
                return null; // O usuário não está cadastrado e pode ser incluído ao banco
            }
        }
        catch (error) {
            res.status(400).send({
                message: `${error} Erro ao verificar usuário`
            });
            return false; // Ocorreu um erro durante a verificação
        }
    }
    const userEmailRequest = user.email;
    verififyIfUserExistsAndCreate(userEmailRequest);
};
UsersController.updateUser = (req, res) => {
    const id = req.params.id;
    User_js_1.default.findByIdAndUpdate(id, {
        $set: req.body
    }, (err) => {
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
UsersController.deleteUser = (req, res) => {
    const id = req.params.id;
    User_js_1.default.findByIdAndDelete(id, (err) => {
        if (!err) {
            res.status(200).send({
                message: `Usuário ${id} excluído com sucesso`
            });
        }
        else {
            res.status(500).send({
                message: err.message
            });
        }
    });
};
UsersController.loginUser = async (req, res) => {
    // const id = req.params.id;
    const { email, password } = req.body;
    if (email && password) { //CHECK IF REQUEST BODY IS COMPLETE
        const user = await User_js_1.default.findOne({ email: email });
        if (user) { //CHECK IF USERS EXISTS AND LOGIN
            const checkPassword = await bcrypt_1.default.compare(password, user.password);
            if (!checkPassword) { //CHECK IF PASSWORD MATCH
                res.status(404).send({ message: `Senha Invalida` });
            }
            else {
                try {
                    const secret = process.env.SECRET;
                    const token = jsonwebtoken_1.default.sign({
                        id: user._id,
                    }, secret); //send token and id
                    res.status(200).send({ message: `Logado com sucesso`, userId: user._id, token });
                }
                catch (error) {
                    res.status(500).send({ message: `Aconteceu algum erro no servidor, tente novamente.` });
                }
            }
        }
        else {
            res.status(404).send({ message: `usuario nao encontrado` });
        }
    }
    else {
        res.status(400).send({ message: `É obrigatório digitar e-mail e senha para efetuar login` });
    }
};
UsersController.listLoggedUserById = async (req, res) => {
    const id = req.params.id;
    const user = await User_js_1.default.findById(id, '-password');
    if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
    }
    res.status(200).send(user);
};
exports.default = UsersController;
