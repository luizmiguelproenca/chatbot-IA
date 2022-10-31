//API REST de Bebidas
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Acompanhamento = require('../model/Acompanhamento')

const validaAcompanhamento = [
    check('nome','Nome do prato é obrigatório').not().isEmpty(),
    check('status','Informe um status válido para a categoria.').isIn(['ativo','inativo']),
]

/********************************
 *  GET /Pratos
 *  Lista todas os veículos
*********************************/
router.get('/', async(req, res) => {
    try{
        const Acompanhamentos = await Acompanhamento.find()
        res.json(Acompanhamentos)
    }catch (err){
        res.status(500).send({
            errors: [{message: 'Não foi possível obter as acompanhamentos!'}]
        })
    }
})

/********************************
 *  GET /Pratos/:id
 *  Lista o veículo pelo id informado
*********************************/
router.get('/:id', async(req, res)=>{
    try{
        const acompanhamento = await Acompanhamento.findById(req.params.id)
        res.json(acompanhamento)
    }catch (err){
        res.status(500).send({
            errors: [{message: `Não foi possível obter o acompanhamento com o id ${req.params.id}`}]
        })
    }
})

/********************************
 *  POST /Pratos
 *  Inclui um novo veículo
*********************************/
router.post('/', validaAcompanhamento,
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(({
                errors: errors.array()
            }))
        }
    try{
        let acompanhamento = new Acompanhamento(req.body)
        await acompanhamento.save()
        res.send(acompanhamento)
    }catch (err){
        return res.status(500).json({
            errors: [{message: `Erro ao salvar acompanhamento: ${err.message}`}]
        })
    }
})

/********************************
 *  PUT /Pratos
 *  Altera um veículo existente
*********************************/
router.put('/', validaAcompanhamento,
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(({
                errors: errors.array()
            }))
        }
    try{
        let dados = req.body
        await Acompanhamento.findByIdAndUpdate(req.body._id, {$set: dados}, {new: true})
        .then(Acompanhamento => {
            res.send({message: `Acompanhamento ${Acompanhamento.nome} alterado com sucesso`})
        })
        .catch(err => {
            return res.status(500).send({message: `Erro ao alterar a Acompanhamento com o ID: ${req.body._id}`})
        })
    }catch (err){
        return res.status(500).json({
            errors: [{message: `Erro ao alterar Acompanhamento: ${err.message}`}]
        })
    }
})

/********************************
 *  DELETE /Pratos/:id
 *  Apaga um veículo pelo id
*********************************/
router.delete('/:id', async(req, res) => {
    await Acompanhamento.findByIdAndRemove(req.params.id)
    .then(Acompanhamento => {
        res.send({message: `Acompanhamento ${Acompanhamento.nome} removido com sucesso`})
    }).catch(err => {
        return res.status(400).send({
            errors: [{message: `Não foi possível excluir o acompanhamento com o ID: ${req.params.id}`}]
        })
    })
})

module.exports = router