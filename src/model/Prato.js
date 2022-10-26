const mongoose = require('mongoose')

const PratoSchema = mongoose.Schema({
    nome: {type: String},
    preco: {type: Number},
    descricao: {type: String},
    diasSemana: {type: Array, dia: ['seg','ter', 'qua', 'qui', 'sex', 'sab']},
    acompanhamentos: {type: Array, acomps: ['farofa','fritas', 'salada', 'legumes', 'macarrao']},
    status: {type: String, enum: ['ativo','inativo'], default: 'ativo'}

},{timestamps: true})

module.exports = mongoose.model('prato', PratoSchema)