import users from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class UsersController {

    static listUsers = (req, res) => {
        users.find(req, '-password -phone', (err, users) => {
            res.status(200).json(users)
        })
    }

    static listUserById = (req, res) => {
        const id = req.params.id
        users.findById(id, '-password -phone', (err, users) => {
            if (err) {
                res.status(400).send({
                    message: `${err.message} id do Usuário não encontrado`
                })
            } else {
                res.status(200).send(users)
            }
        })
    }

    static createUser = async (req, res) => {
        // let userRequest = req.body
        let user = new users(req.body)
        
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(user.password, salt)               

        async function verififyIfUserExistsAndCreate(email) {
            try {
                const userToVerify = await users.findOne({
                    email: email // Procura um usuário com o email fornecido
                }); 
                if (userToVerify) {
                    res.status(403).send({
                        message: `Usuário já cadastrado`
                    })
                    return true; // O usuário já está cadastrado
                } else {
                    user.password = passwordHash
                    user.save((err) => {// O usuário não está cadastrado e pode ser incluído ao banco
                        if (err) {
                            res.status(500).send({
                                message: `Erro ao criar usuário: ${err.message}`
                            })
                        } else {
                            res.status(201).send(users.toJSON)
                        }
                    })
                    return null; // O usuário não está cadastrado e pode ser incluído ao banco
                }
            } catch (error) {
                res.status(400).send({
                    message: `${error} Erro ao verificar usuário`
                })
                return false; // Ocorreu um erro durante a verificação
            }
        }
        
        const userEmailRequest = user.email
        verififyIfUserExistsAndCreate(userEmailRequest);
    }

    static updateUser = (req, res) => {
        const id = req.params.id;

        users.findByIdAndUpdate(id, {
            $set: req.body
        }, (err) => {
            if (!err) {
                res.status(200).send({
                    message: 'Usuário atualizado com sucesso'
                })
            } else {
                res.status(500).send({
                    message: err.message
                })
            }
        })
    }

    static deleteUser = (req, res) => {
        const id = req.params.id
        users.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({
                    message: `Usuário ${id} excluído com sucesso`
                })
            } else {
                res.status(500).send({
                    message: err.message
                })
            }
        })
    }

    static loginUser = async (req, res) => {
        // const id = req.params.id;
        const {email, password} = req.body

        if(email && password){//CHECK IF REQUEST BODY IS COMPLETE
            const user = await users.findOne({ email: email})
           
            if (user) { //CHECK IF USERS EXISTS AND LOGIN
                const checkPassword = await bcrypt.compare(password, user.password)

                if (!checkPassword) {//CHECK IF PASSWORD MATCH
                    res.status(404).send({message: `Senha Invalida` })
                } else {
                    try {
                        const secret = process.env.SECRET
                        const token = jwt.sign({
                            id: user._id,
                        },
                        secret)//send token
                        res.status(200).send({message: `Logado com sucesso`, token })
                    } catch (error) {
                        res.status(500).send({message: `Aconteceu algum erro no servidor, tente novamente.` })
                    }
                }
            } else {
                res.status(404).send({message: `usuario nao encontrado` })
            }
        } else {
            res.status(400).send({message: `É obrigatório digitar e-mail e senha para efetuar login` })
        }
        
    }

    static listLoggedUserById = async (req, res) => {
        const id = req.params.id
        
        const user = await users.findById(id, '-password')

        if (!user) {
            return res.status(404).send({message: 'Usuário não encontrado'})
        }

        res.status(200).send(user)
    }
}

export default UsersController