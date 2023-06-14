import app from "./app"

const port = process.env.PORT || 21041

export default app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
})