const Pessoa = require('../lib/Pessoa');
const jwt = require('jsonwebtoken');

class PessoaController {

    segredo = 'process.env.SEGREDO';

    constructor(pessoasStore) {
        this.pessoasStore = pessoasStore;
    }

    idade(request, response) {
        let body = request.body;

        let pessoa = new Pessoa(body.nome, parseInt(body['ano']));

        let idade = pessoa.getIdade();

        response.render('idade', {pessoa: pessoa, idade});
    }

    async listar(request, response) {
        let pessoas = await this.pessoasStore.listar();
        response.json(pessoas);
    }

    async inserir(request, response) {
        let pessoa = new Pessoa(request.body.nome, parseInt(request.body.ano));
        pessoa.senha = request.body.senha;
        await this.pessoasStore.inserir(pessoa);
        response.status(201).json(pessoa);
    }

    async alterar(request, response) {
        let id = request.params.id
        let pessoa = new Pessoa(request.body.nome, parseInt(request.body.ano));
        await this.pessoasStore.alterar(id, pessoa);
        response.send();
    }

    async apagar(request, response) {
        let id = request.params.id
        await this.pessoasStore.apagar(id);
        response.send();
    }

    async ver(request, response) {
        let id = request.params.id
        let pessoa = await this.pessoasStore.ver(id);
        response.json(pessoa);
    }

    async login(request, response) {
        let nome = request.body.nome;
        let senha = request.body.senha;
        let pessoa = await this.pessoasStore.procurarPorNome(nome);
        console.log({pessoa});
        if (pessoa) {
            if (pessoa.compararSenha(senha)) {
                let token = jwt.sign({...pessoa}, this.segredo);
                response.cookie('token', token);
                response.json({ok: true});
                return
            }
        }
        response.json({ok: false});
    }

    

}

module.exports = PessoaController;