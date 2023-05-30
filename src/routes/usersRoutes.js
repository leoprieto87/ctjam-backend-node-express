import express from "express";
import UsersController from "../controllers/usersController";
import jwt from "jsonwebtoken"

const router = express.Router()

router
    .get('/users', UsersController.listUsers)
    .post('/users/login/authToken', UsersController.loginUser)
    .post('/users/login/authUser/:id', checkToken, UsersController.listLoggedUserById)
    .get('/users/:id', UsersController.listUserById)
    .post('/users/register', UsersController.createUser)
    .put('/users/update/:id', UsersController.updateUser)
    .delete('/users/delete/:id', UsersController.deleteUser)

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).send({message: 'Acesso negado!'})
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
        
    } catch (error) {
        res.status(400).send({message: 'Token inválido!'})
    }
}


export default router