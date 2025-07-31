class IndexedDBStore {

    constructor(conectar) {
        this.conectar = conectar;
    }

    async listar() {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await this.conectar();
                const transaction = db.transaction([this.tabela], "readonly");
                const objectStore = transaction.objectStore(this.tabela);
                const request = objectStore.getAll();
                request.onsuccess = function (event) {
                    let servicos = event.target.result;
                    db.close();
                    resolve(servicos);
                };
                request.onerror = function (event) {
                    reject(new Error("Erro listando: " + event.target.error));
                };

            } catch (err) {
                reject(err);
            }
        });
    }

    inserir(servico) {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await this.conectar();
                const transaction = db.transaction([this.tabela], "readwrite");
                const objectStore = transaction.objectStore(this.tabela);
                const request = objectStore.add(servico);
                request.onsuccess = function (event) {
                    servico.id = event.target.result;
                    db.close();
                    console.log('inseriu com sucesso', event);
                    resolve(servico);
                };
                request.onerror = function (event) {
                    reject(new Error("Erro inserindo: " + event.target.error));
                };

            } catch (err) {
                reject(err);
            }
        });
    }
    
    async alterar(id, servico) {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await this.conectar();
                const transaction = db.transaction([this.tabela], "readwrite");
                const objectStore = transaction.objectStore(this.tabela);
                const request = objectStore.put(servico);
                request.onsuccess = function (event) {
                    let servico = event.target.result;
                    db.close();
                    resolve(servico);
                };
                request.onerror = function (event) {
                    reject(new Error("Erro ver: " + event.target.error));
                };

            } catch (err) {
                reject(err);
            }
        });
    }

    async apagar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await this.conectar();
                const transaction = db.transaction([this.tabela], "readwrite");
                const objectStore = transaction.objectStore(this.tabela);
                const request = objectStore.delete(id);
                request.onsuccess = function (event) {
                    let servico = event.target.result;
                    db.close();
                    resolve(servico);
                };
                request.onerror = function (event) {
                    reject(new Error("Erro ver: " + event.target.error));
                };

            } catch (err) {
                reject(err);
            }
        });
    }

    async ver(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await this.conectar();
                const transaction = db.transaction([this.tabela], "readonly");
                const objectStore = transaction.objectStore(this.tabela);
                const request = objectStore.get(id);
                request.onsuccess = function (event) {
                    let servico = event.target.result;
                    db.close();
                    resolve(servico);
                };
                request.onerror = function (event) {
                    reject(new Error("Erro ver: " + event.target.error));
                };

            } catch (err) {
                reject(err);
            }
        });
    }
}
class PessoasIndexedDBStore extends IndexedDBStore {
    constructor(conectar) {
        super(conectar);
        this.tabela = 'pessoas';
    }
    procurarPorId(id) {
        return this.ver(id);
    }
}
class ServicosIndexedDBStore extends IndexedDBStore {
    constructor(conectar) {
        super(conectar);
        this.tabela = 'servicos';
    }

    async procurarPorNome(nomePesquisa) {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await this.conectar();
                const transaction = db.transaction([this.tabela], "readonly");
                const objectStore = transaction.objectStore(this.tabela);
                const request = objectStore.index('nome').getAll(nomePesquisa);
                request.onsuccess = function (event) {
                    let servico = event.target.result;
                    db.close();
                    resolve(servico);
                };
                request.onerror = function (event) {
                    reject(new Error("Erro ver: " + event.target.error));
                };

            } catch (err) {
                reject(err);
            }
        });
    }
}

// module.exports = ServicosIndexedDBStore;