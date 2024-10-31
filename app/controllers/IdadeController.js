const Pessoa = require('../lib/Pessoa');
class IdadeController {
    idade(request, response) {
        let body = request.body;
        console.log('parsed', body);

        let pessoa = new Pessoa(body.nome, parseInt(body['ano']));

        let idade = pessoa.getIdade();

        response.render('idade', {pessoa: pessoa, idade});
    }
}

module.exports = IdadeController;