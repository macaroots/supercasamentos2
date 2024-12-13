class PessoasMysqlStore {

    constructor(conectar) {
        this.conectar = conectar;
    }

    async listar() {
        try {
            let connection = await this.conectar();
            const [results, fields] = await connection.query(
                'SELECT * FROM `pessoas`'
            );
    
            return results;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async inserir(pessoa) {
        try {
            let connection = await this.conectar();
            let sql = `INSERT INTO pessoas VALUES (DEFAULT, ?, ?, ?)`;

            console.log(sql);
            const [results, fields] = await connection.query(sql, [
                pessoa.nome,
                pessoa.ano, 
                pessoa.senha
            ]);
            pessoa.id = results.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
    alterar(id, p) {
    }

    apagar(id) {
    }

    ver(id) {
        return ;
    }
    
    procurarPorNome(nome) {
        return ;
    }
}

module.exports = PessoasMysqlStore;