import users from "../models/User"

class UsersController {

    static listUsers = (req, res) => {
        users.find((err, users) => {
            res.status(200).json(users)
            console.log(err)
        })
    }

    static listUserById = (req, res) => {
        const id = req.params.id
        users.findById(id, (err, users) => {
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
        let user = new users(req.body)
        async function verififyIfUserExists(phone) {
            try {
                const userToVerify = await users.findOne({
                    phone: phone // Procura um usuário com o telefone fornecido
                }); 
                if (userToVerify) {
                    res.status(403).send({
                        message: `Usuário já cadastrado`
                    })
                    return true; // O usuário já está cadastrado
                } else {
                    user.save((err) => {
                        if (err) {
                            res.status(500).send({
                                message: `Erro ao criar usuário: ${err.message}`
                            })
                        } else {
                            res.status(201).send(users.toJSON)
                        }
                    })
                    return false; // O usuário não está cadastrado e pode ser incluído ao banco
                }
            } catch (error) {
                res.status(400).send({
                    message: `${error} Erro ao verificar usuário`
                })
                return false; // Ocorreu um erro durante a verificação
            }
        }

        const userPhoneRequest = user.phone
        verififyIfUserExists(userPhoneRequest);
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
}

export default UsersController