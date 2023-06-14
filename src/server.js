import app from "./app"

const port = process.env.PORT || 3131

export default app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
})