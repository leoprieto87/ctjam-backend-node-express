import express from "express"
import livros from './livrosRoutes'
import autores from './autoresRoutes'
import users from './usersRoutes'
import jams from './jamsRoutes'


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'Curso de node, url raiz'})
    })

    app.use(
        express.json(),
        livros,
        autores,
        users,
        jams,
    )
}

export default routes