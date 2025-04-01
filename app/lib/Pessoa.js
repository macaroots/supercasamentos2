const bcrypt = require('bcrypt');

class Pessoa {
    id;
    nome;
    ano;
    _senha;
    static SALT_ROUNDS = 10;
    saltRounds

    constructor(nome, ano, senha, id) {
        this.nome = nome;
        this.ano = ano;
        this._senha = senha;
        this.id = id;
    }

    getIdade() {
        return 2024 - this.ano;
    }

    set senha(senha) {
        console.log({senha});
        if (!senha) {
            throw new Error('Senha não pode ser vazia!');
        }
        this._senha = bcrypt.hashSync(senha, Pessoa.SALT_ROUNDS);
    }

    get senha() {
        return this._senha;
    }

    compararSenha(senha) {
        return bcrypt.compareSync(senha, this.senha);
    }
}

module.exports = Pessoa;