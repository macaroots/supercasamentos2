const Servico = require('../lib/Servico');
const jwt = require('jsonwebtoken');
const express = require('express');

class ServicosController {

    segredo = process.env.SEGREDO;

    constructor(servicosStore) {
        this.servicosStore = servicosStore;
    }

    getRouter() {
        const rotas = express.Router();


        rotas.get('/', (req, res) => {
            this.listar(req, res);
        })
        rotas.get('/:id', (req, res) => {
            this.ver(req, res);
        })
        rotas.post('/', (req, res) => {
            this.inserir(req, res);
        })
        rotas.put('/:id', (req, res) => {
            this.alterar(req, res);
        })
        rotas.delete('/:id', (req, res) => {
            this.apagar(req, res);
        })


        return rotas;
    }

    async listar(request, response) {
        let servicos = await this.servicosStore.listar();
        response.json(servicos);
    }

    async inserir(request, response) {
        try {
            let servico = new Servico(request.body);
            await this.servicosStore.inserir(servico);
            response.status(201).json(servico);
        } catch (e) {
            response.status(400).send('Erro: ' + e.message);
        }
    }

    async alterar(request, response) {
        let id = request.params.id
        let servico = new Servico(request.body);
        await this.servicosStore.alterar(id, servico);
        response.send(servico);
    }

    async apagar(request, response) {
        let id = request.params.id
        await this.servicosStore.apagar(id);
        response.send();
    }

    async ver(request, response) {
        let id = request.params.id
        let servico = await this.servicosStore.ver(id);
        response.json(servico);
    }
   

}

module.exports = ServicosController;