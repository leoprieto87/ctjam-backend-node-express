import express from 'express'
import routes from './routes/index.js'
import cors from 'cors'
import db from './config/dbConnect.js'

db.on('error', console.log.bind(console, 'Erro de conexao com banco'))
db.once('open', () =>{
    console.log('Conexão com banco de dados feita com sucesso')
})

const app = express()


app.use(cors());
app.use(express.json(cors()))

routes(app)

const port = 21075


app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`)
})

export default app