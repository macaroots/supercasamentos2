const express = require('express');
const cookieParser = require('cookie-parser')

const jwt = require('jsonwebtoken');


const IndexController = require('./controllers/IndexController');
const PessoaController = require('./controllers/PessoaController');
const PessoasStore = require('./lib/PessoasStore');

const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const pessoasStore = new PessoasStore();

const indexController = new IndexController();
const pessoaController = new PessoaController(pessoasStore);

let segredo = 'process.env.SEGREDO';
let autenticar = (req, res, next) => {
    let token = req.cookies.token;
    console.log('autenticando', token);
    let decodificado = jwt.verify(token, segredo);
    console.log(decodificado);
    if (decodificado.id) {
        next();
    }
    else {
        res.status(401).send('Acesso negado');
    }
}

app.get('/', (req, res) => {
    indexController.index(req, res);
});

app.get('/idade', (req, res) => {
    res.send(req.query);
});
app.post('/idade', (req, res) => {
    pessoaController.idade(req, res);
});

app.get('/pessoas', (req, res) => {
    pessoaController.listar(req, res);
})
app.get('/pessoas/:id', autenticar, (req, res) => {
    pessoaController.ver(req, res);
})
app.post('/pessoas', (req, res) => {
    pessoaController.inserir(req, res);
})
app.put('/pessoas/:id', (req, res) => {
    pessoaController.alterar(req, res);
})
app.delete('/pessoas/:id', (req, res) => {
    pessoaController.apagar(req, res);
})

app.post('/login', (req, res) => {
    pessoaController.login(req, res);
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

