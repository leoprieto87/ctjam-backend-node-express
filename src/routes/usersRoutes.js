import express from "express";
import UsersController from "../controllers/usersController";

const router = express.Router()

router
    .get('/users', UsersController.listUsers)
    .get('/users/:id', UsersController.listUserById)
    .post('/users', UsersController.createUser)
    .put('/users/:id', UsersController.updateUser)
    .delete('/users/:id', UsersController.deleteUser)

export default router