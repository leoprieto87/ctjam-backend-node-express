import express from "express"
import users from './usersRoutes.js'
import jams from './jamsRoutes.js'


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'backend ctjam, url raiz sem parametros'})
    })

    app.use(
        express.json(),
        users,
        jams,
    )
}

export default routes