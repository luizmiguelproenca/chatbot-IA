//API REST de Pratos
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Prato = require('../model/Prato')

const validaPrato = [
    check('nome','Nome do prato é obrigatório').not().isEmpty(),
    check('preco','Preco do prato não informado').not().isString(),
    check('descricao','Erro! Inserir descricao').not().isEmpty(),
    check('diasSemana','Informe os dias da semana deste prato.').isIn(['seg','ter', 'qua', 'qui', 'sex', 'sab']),
    check('acompanhamentos','Informe um acompanhamento válido.').isIn(['farofa','fritas', 'salada', 'legumes', 'macarrao']),
    check('status','Informe um status válido para a categoria.').isIn(['ativo','inativo']),
]

/********************************
 *  GET /Pratos
 *  Lista todas os veículos
*********************************/
router.get('/', async(req, res) => {
    try{
        const Pratos = await Prato.find()
        res.json(Pratos)
    }catch (err){
        res.status(500).send({
            errors: [{message: 'Não foi possível obter os veículos!'}]
        })
    }
})

/********************************
 *  GET /Pratos/:id
 *  Lista o veículo pelo id informado
*********************************/
router.get('/:id', async(req, res)=>{
    try{
        const Prato = await Prato.findById(req.params.id)
        res.json(Prato)
    }catch (err){
        res.status(500).send({
            errors: [{message: `Não foi possível obter o veículo com o id ${req.params.id}`}]
        })
    }
})

/********************************
 *  POST /Pratos
 *  Inclui um novo veículo
*********************************/
router.post('/', validaPrato,
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(({
                errors: errors.array()
            }))
        }
    try{
        let prato = new Prato(req.body)
        await prato.save()
        res.send(prato)
    }catch (err){
        return res.status(500).json({
            errors: [{message: `Erro ao salvar veículo: ${err.message}`}]
        })
    }
})

/********************************
 *  PUT /Pratos
 *  Altera um veículo existente
*********************************/
router.put('/', validaPrato,
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(({
                errors: errors.array()
            }))
        }
    try{
        let dados = req.body
        await Prato.findByIdAndUpdate(req.body._id, {$set: dados}, {new: true})
        .then(Prato => {
            res.send({message: `Prato ${Prato.marca} ${Prato.modelo} alterado com sucesso`})
        })
        .catch(err => {
            return res.status(500).send({message: `Erro ao alterar o Prato com o ID: ${req.body._id}`})
        })
    }catch (err){
        return res.status(500).json({
            errors: [{message: `Erro ao alterar veículo: ${err.message}`}]
        })
    }
})

/********************************
 *  DELETE /Pratos/:id
 *  Apaga um veículo pelo id
*********************************/
router.delete('/:id', async(req, res) => {
    await Prato.findByIdAndRemove(req.params.id)
    .then(Prato => {
        res.send({message: `Prato ${Prato.marca} ${Prato.modelo} removido com sucesso`})
    }).catch(err => {
        return res.status(400).send({
            errors: [{message: `Não foi possível excluir o veículo com o ID: ${req.params.id}`}]
        })
    })
})

module.exports = router