const Pessoa = require('../lib/Pessoa');
class PessoaController {

    constructor(pessoasStore) {
        this.pessoasStore = pessoasStore;
    }

    idade(request, response) {
        let body = request.body;

        let pessoa = new Pessoa(body.nome, parseInt(body['ano']));

        let idade = pessoa.getIdade();

        response.render('idade', {pessoa: pessoa, idade});
    }

    listar(request, response) {
        let pessoas = this.pessoasStore.listar();
        response.json(pessoas);
    }

    inserir(request, response) {
        let pessoa = new Pessoa(request.body.nome, parseInt(request.body.ano));
        this.pessoasStore.inserir(pessoa);
        response.status(201).json(pessoa);
    }

    alterar(request, response) {
        let id = request.params.id
        let pessoa = new Pessoa(request.body.nome, parseInt(request.body.ano));
        this.pessoasStore.alterar(id, pessoa);
        response.send();
    }

    apagar(request, response) {
        let id = request.params.id
        this.pessoasStore.apagar(id);
        response.send();
    }

    ver(request, response) {
        let id = request.params.id
        let pessoa = this.pessoasStore.ver(id);
        response.json(pessoa);
    }
}

module.exports = PessoaController;