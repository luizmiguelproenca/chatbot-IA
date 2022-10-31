//API REST de Pratos
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Bebida = require('../model/Bebida')

const validaBebida = [
    check('nome','Nome do prato é obrigatório').not().isEmpty(),
    check('preco','Preco do prato não informado').not().isString(),
    check('status','Informe um status válido para a categoria.').isIn(['ativo','inativo']),
]

/********************************
 *  GET /Pratos
 *  Lista todas os veículos
*********************************/
router.get('/', async(req, res) => {
    try{
        const Bebidas = await Bebida.find()
        res.json(Bebidas)
    }catch (err){
        res.status(500).send({
            errors: [{message: 'Não foi possível obter as bebidas!'}]
        })
    }
})

/********************************
 *  GET /Pratos/:id
 *  Lista o veículo pelo id informado
*********************************/
router.get('/:id', async(req, res)=>{
    try{
        const bebida = await Bebida.findById(req.params.id)
        res.json(bebida)
    }catch (err){
        res.status(500).send({
            errors: [{message: `Não foi possível obter a bebida com o id ${req.params.id}`}]
        })
    }
})

/********************************
 *  POST /Pratos
 *  Inclui um novo veículo
*********************************/
router.post('/', validaBebida,
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(({
                errors: errors.array()
            }))
        }
    try{
        let bebida = new Bebida(req.body)
        await bebida.save()
        res.send(bebida)
    }catch (err){
        return res.status(500).json({
            errors: [{message: `Erro ao salvar bebida: ${err.message}`}]
        })
    }
})

/********************************
 *  PUT /Pratos
 *  Altera um veículo existente
*********************************/
router.put('/', validaBebida,
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(({
                errors: errors.array()
            }))
        }
    try{
        let dados = req.body
        await Bebida.findByIdAndUpdate(req.body._id, {$set: dados}, {new: true})
        .then(Bebida => {
            res.send({message: `Bebida ${Bebida.nome} alterado com sucesso`})
        })
        .catch(err => {
            return res.status(500).send({message: `Erro ao alterar a Bebida com o ID: ${req.body._id}`})
        })
    }catch (err){
        return res.status(500).json({
            errors: [{message: `Erro ao alterar bebida: ${err.message}`}]
        })
    }
})

/********************************
 *  DELETE /Pratos/:id
 *  Apaga um veículo pelo id
*********************************/
router.delete('/:id', async(req, res) => {
    await Bebida.findByIdAndRemove(req.params.id)
    .then(Bebida => {
        res.send({message: `Bebida ${Bebida.nome} removido com sucesso`})
    }).catch(err => {
        return res.status(400).send({
            errors: [{message: `Não foi possível excluir o veículo com o ID: ${req.params.id}`}]
        })
    })
})

module.exports = router