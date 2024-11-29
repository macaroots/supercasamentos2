class PessoasStore {
    pessoas = [];

    listar() {
        return this.pessoas;
    }

    inserir(pessoa) {
        this.pessoas.push(pessoa);
        pessoa.id = this.pessoas.length;
    }
    
    alterar(id, p) {
        let pessoa = this.ver(id);
        Object.assign(pessoa, p);
    }

    apagar(id) {
        this.pessoas.splice(id, 1);
    }

    ver(id) {
        return this.pessoas.filter(p => p.id == id)[0];
    }
    
    procurarPorNome(nome) {
        let p = this.pessoas.filter(p => p.nome == nome)[0];
        console.log({p, ps: this.pessoas})
        return p;
    }
}

module.exports = PessoasStore;