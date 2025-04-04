const Pessoa = require("./Pessoa");

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
    
    async alterar(id, pessoa) {
        try {
            let connection = await this.conectar();
            let sql = `UPDATE pessoas SET nome=?, ano=? where id=?`;
            console.log(sql);
            const [results, fields] = await connection.query(sql, [
                pessoa.nome,
                pessoa.ano, 
                id
            ]);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async apagar(id) {
        try {
            let connection = await this.conectar();
            let sql = `DELETE FROM pessoas where id=?`;
            console.log(sql);
            const [results, fields] = await connection.query(sql, [
                id
            ]);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async ver(id) {
        try {
            let connection = await this.conectar();
            const [results, fields] = await connection.query(
                'SELECT * FROM `pessoas` WHERE id=?',
                [id]
            );
    
            return results[0];
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
    async procurarPorNome(nomePesquisa) {
        try {
            let connection = await this.conectar();
            const [results, fields] = await connection.query(
                'SELECT * FROM `pessoas` WHERE nome=?',
                [nomePesquisa]
            );
    
            if (results[0]) {
                let {id, nome, ano, senha} = results[0];
                return new Pessoa(nome, ano, senha, id);
            }
            else {
                return null;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = PessoasMysqlStore;