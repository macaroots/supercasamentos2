class PessoasStore {
    pessoas = [];

    async listar() {
        return this.pessoas;
    }

    async inserir(pessoa) {
        this.pessoas.push(pessoa);
        pessoa.id = this.pessoas.length;
    }
    
    async alterar(id, p) {
        let pessoa = this.ver(id);
        Object.assign(pessoa, p);
    }

    async apagar(id) {
        this.pessoas.splice(id, 1);
    }

    async ver(id) {
        return this.pessoas.filter(p => p.id == id)[0];
    }
    
    async procurarPorNome(nome) {
        let p = this.pessoas.filter(p => p.nome == nome)[0];
        console.log({p, ps: this.pessoas})
        return p;
    }
}

module.exports = PessoasStore;