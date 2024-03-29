import { app } from './app'
require('dotenv').config()

const porta = process.env.PORT || 3000

const server = app.listen(porta, () => console.log(`App rodando na porta ${porta}`))

process.on('SIGINT', () => {
    server.close()
    console.log("App finalizado")
})