import express from "express"
import users from './usersRoutes.js'
import jams from './jamsRoutes.js'


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'Curso de node, url raiz'})
    })

    app.use(
        express.json(),
        users,
        jams,
    )
}

export default routes