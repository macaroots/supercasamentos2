const bcrypt = require('bcrypt');

class Pessoa {
    nome;
    ano;
    static SALT_ROUNDS = 10;
    saltRounds

    constructor(nome, ano) {
        this.nome = nome;
        this.ano = ano;
    }

    getIdade() {
        return 2024 - this.ano;
    }

    set senha(senha) {
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