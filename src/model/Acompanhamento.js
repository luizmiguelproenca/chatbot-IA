const mongoose = require('mongoose')

const AcompanhamentoSchema = mongoose.Schema({
    nome: {type: String},
    status: {type: String, enum: ['ativo','inativo'], default: 'ativo'}

},{timestamps: true})

module.exports = mongoose.model('acompanhamento', AcompanhamentoSchema)