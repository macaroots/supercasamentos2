const Pessoa = require('../lib/Pessoa');
const jwt = require('jsonwebtoken');
const express = require('express');

class PessoaController {

    segredo = process.env.SEGREDO;

    constructor(pessoasStore) {
        this.pessoasStore = pessoasStore;
    }

    getRouter() {
        const rotas = express.Router();


        rotas.get('/', (req, res) => {
            pessoaController.listar(req, res);
        })
        rotas.get('/:id', (req, res) => {
            pessoaController.ver(req, res);
        })
        rotas.post('/', (req, res) => {
            pessoaController.inserir(req, res);
        })
        rotas.put('/:id', (req, res) => {
            pessoaController.alterar(req, res);
        })
        rotas.delete('/:id', (req, res) => {
            pessoaController.apagar(req, res);
        })


        return rotas;
    }

    idade(request, response) {
        let body = request.body;

        let pessoa = new Pessoa(body.nome, parseInt(body.ano));

        let idade = pessoa.getIdade();

        response.render('idade', {pessoa, idade});
    }

    async listar(request, response) {
        let pessoas = await this.pessoasStore.listar();
        response.json(pessoas);
    }

    async inserir(request, response) {
        try {
            let pessoa = new Pessoa(request.body.nome, parseInt(request.body.ano));
            pessoa.senha = request.body.senha;
            await this.pessoasStore.inserir(pessoa);
            response.status(201).json(pessoa);
        } catch (e) {
            response.status(400).send('Erro: ' + e.message);
        }
    }

    async alterar(request, response) {
        let id = request.params.id
        let pessoa = new Pessoa(request.body.nome, parseInt(request.body.ano));
        await this.pessoasStore.alterar(id, pessoa);
        response.send(pessoa);
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

    loginForm(request, response) {
        response.render('login');
    }

    async login(request, response) {
        let nome = request.body.nome;
        let senha = request.body.senha;
        let pessoa = await this.pessoasStore.procurarPorNome(nome);
        console.log({pessoa});
        if (pessoa) {
            if (pessoa.compararSenha(senha)) {
                let token = jwt.sign({...pessoa}, this.segredo);
                response.cookie('token', token, {httpOnly: true, maxAge: 86400000});
                response.json({ok: true});
                return
            }
        } else {
            new Pessoa('', '', 'a').compararSenha('b');
        }
        response.json({ok: false});
    }

    

}

module.exports = PessoaController;