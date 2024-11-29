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

    listar(request, response) {
        let pessoas = this.pessoasStore.listar();
        response.json(pessoas);
    }

    inserir(request, response) {
        let pessoa = new Pessoa(request.body.nome, parseInt(request.body.ano));
        pessoa.senha = request.body.senha;
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

    login(request, response) {
        let nome = request.body.nome;
        let senha = request.body.senha;
        let pessoa = this.pessoasStore.procurarPorNome(nome);
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