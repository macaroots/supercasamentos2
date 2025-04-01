class IndexController {

    constructor(servicosStore) {
        this.servicosStore = servicosStore;
    }

    async index(request, response) {
        let servicos = await this.servicosStore.listar();
        response.render('index', {servicos});
    }
}

module.exports = IndexController;