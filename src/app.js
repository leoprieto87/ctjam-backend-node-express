import express from 'express'
import db from './config/dbConnect'
import routes from './routes'
import cors from 'cors'

db.on('error', console.log.bind(console, 'Erro de conexao com banco'))
db.once('open', () =>{
    console.log('Conexão com banco de dados feita com sucesso')
})

const app = express()


app.use(cors());
app.use(express.json(cors()))

routes(app)

export default app