class Pessoa {
    nome;
    ano;

    constructor(nome, ano) {
        this.nome = nome;
        this.ano = ano;
    }

    getIdade() {
        return 2024 - this.ano;
    }
}

module.exports = Pessoa;