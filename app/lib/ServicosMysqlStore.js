const Servico = require("./Servico");

class ServicosMysqlStore {

    constructor(conectar) {
        this.conectar = conectar;
    }

    async listar() {
        try {
            let connection = await this.conectar();
            const [results, fields] = await connection.query(
                'SELECT * FROM `servicos`'
            );
    
            return results;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async inserir(servico) {
        try {
            let connection = await this.conectar();
            let sql = `INSERT INTO servicos VALUES (DEFAULT, ?, ?, ?, ?, ?)`;

            console.log(sql);
            const [results, fields] = await connection.query(sql, [
                servico.nome,
                servico.duracao, 
                servico.preco,
                servico.descricao,
                servico.imagem
            ]);
            servico.id = results.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
    async alterar(id, servico) {
        try {
            let connection = await this.conectar();
            let sql = `UPDATE servicos SET nome=?, ano=? where id=?`;
            console.log(sql);
            const [results, fields] = await connection.query(sql, [
                servico.nome,
                servico.ano, 
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
            let sql = `DELETE FROM servicos where id=?`;
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
                'SELECT * FROM `servicos` WHERE id=?',
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
                'SELECT * FROM `servicos` WHERE nome=?',
                [nomePesquisa]
            );
    
            if (results[0]) {
                let {id, nome, ano, senha} = results[0];
                return new servico(nome, ano, senha, id);
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

module.exports = ServicosMysqlStore;