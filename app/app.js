const express = require('express');

const IndexController = require('./controllers/IndexController');
const IdadeController = require('./controllers/IdadeController');

const http = require('http'); 

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const indexController = new IndexController();
const idadeController = new IdadeController();
app.get('/', (req, res) => {
    indexController.index(req, res);
});

app.get('/idade', (req, res) => {
    res.send(req.query);
});
app.post('/idade', (req, res) => {
    idadeController.idade(req, res);
});

app.get('*', function naoEncontrado(request, response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Não encontrado!\n')
    response.end();
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

