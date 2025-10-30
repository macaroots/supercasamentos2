class IndexController {

    constructor(servicosStore) {
        this.servicosStore = servicosStore;
    }

    async index(request, response) {
        let servicos = await this.servicosStore.listar();
        console.log('index');
        response.render('index', {servicos, a: request.info});
    }
    
    async servicos(request, response) {
        let servicos = await this.servicosStore.listar();
        console.log('servicos');
        response.render('servicos', {servicos, a: request.info});
    }
}

module.exports = IndexController;