class IndexController {

    constructor(servicosStore) {
        this.servicosStore = servicosStore;
    }

    async index(request, response) {
        let servicos = await this.servicosStore.listar();
        response.render('index', {servicos, a: request.info});
    }
}

module.exports = IndexController;