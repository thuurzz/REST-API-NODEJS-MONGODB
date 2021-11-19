// Variável de ambiente para não expor as credenciais do bd
require("dotenv").config()

// Instância dos módulos
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// configuração da conexão com o bd mongo
mongoose.connect(
    process.env.DATABASE_STRING,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
    }
)

// realiza conexão e mostra se ocorrer algum erro
const bd = mongoose.connection
bd.on("error", (err)=> console.log(err))
bd.once("open", ()=> console.log("Database Connected"))

// faz o projeto aceitar padrão JSON (função de middleware)
app.use(express.json())

// sobe servidor na porta 3000
app.listen(3000, ()=>{
    console.log("Server running!")
})