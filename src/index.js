const express = require('express')
require('dotenv').config()
const cors = require('cors') 
const InicializaMongoServer = require('./config/db')
const rotasPrato = require('./routes/Prato')
const rotasBebida = require('./routes/Bebida')
const rotasAcompanhamento = require('./routes/Acompanhamento')

InicializaMongoServer()
const app = express()

app.use(cors()) //CORS

app.use(express.json()) 

const PORT = process.env.PORT

//Definindo a primeira rota do servidor
app.get("/",(req, res) => {
    res.json({
        mensagem: 'API 100% funcional! ð¤',
        vesao: '1.0.0'
    })
})
//Rotas do App
app.use("/pratos", rotasPrato)
app.use("/bebidas", rotasBebida)
app.use("/acompanhamentos", rotasAcompanhamento)


//Rota para tratamento de erro 404
app.use(function(req, res) {
    res.status(404).json({
        mensagem: `ð« A rota ${req.originalUrl} nÃ£o existe!`
    })
})

app.listen(PORT, (req, res) => {
    console.log(`ð Servidor WEB rodando na porta ${PORT}`)
})