const Servico = require('../lib/Servico');
const jwt = require('jsonwebtoken');

class ServicosController {

    segredo = process.env.SEGREDO;

    constructor(servicosStore) {
        this.servicosStore = servicosStore;
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