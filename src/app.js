import express from 'express'
import db from './config/dbConnect'
import routes from './routes'

db.on('error', console.log.bind(console, 'Erro de conexao com banco'))
db.once('open', () =>{
    console.log('Conexão com banco de dados feita com sucesso')
})

const app = express()

app.use(express.json())

routes(app)

export default app