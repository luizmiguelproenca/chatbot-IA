const mongoose = require('mongoose')

const BebidaSchema = mongoose.Schema({
    nome: {type: String},
    preco: {type: Number},
    status: {type: String, enum: ['ativo','inativo'], default: 'ativo'}

},{timestamps: true})

module.exports = mongoose.model('bebida', BebidaSchema)