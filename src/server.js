import app from "./app"

const port = process.env.PORT

export default app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
    // console.log(`Servidor escutando em http://localhost:${port}`)
})