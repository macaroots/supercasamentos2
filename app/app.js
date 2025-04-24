const express = require('express');
const cookieParser = require('cookie-parser')

const jwt = require('jsonwebtoken');

const mysql = require('mysql2/promise');

const IndexController = require('./controllers/IndexController');
const PessoaController = require('./controllers/PessoaController');
const PessoasMysqlStore = require('./lib/PessoasMysqlStore');
const ServicosController = require('./controllers/ServicosController');
const ServicosMysqlStore = require('./lib/ServicosMysqlStore');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const conectar = () => {
    return mysql.createConnection({
        host: 'db',
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DATABASE,
    });
}

const pessoasStore = new PessoasMysqlStore(conectar);
const servicosStore = new ServicosMysqlStore(conectar);

const indexController = new IndexController(servicosStore);
const pessoaController = new PessoaController(pessoasStore);
const servicosController = new ServicosController(servicosStore);

let segredo = 'process.env.SEGREDO';
let autenticar = (req, res, next) => {
    let token = req.cookies.token;
    console.log('autenticando', token);
    if (token) {
        let decodificado = jwt.verify(token, segredo);
        console.log(decodificado);
        if (decodificado.id) {
            next();
            return;
        }
    }
    res.status(401).send('Acesso negado');
}

app.get('/', (req, res) => {
    indexController.index(req, res);
});

app.get('/admin/pessoas', (req, res) => {
    res.render('admin/pessoas');
});
app.get('/admin/servicos', async (req, res) => {
    let servicos = await servicosStore.listar();
    res.render('admin/servicos', {servicos});
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



app.get('/servicos', (req, res) => {
    servicosController.listar(req, res);
})
app.get('/servicos/:id', autenticar, (req, res) => {
    servicosController.ver(req, res);
})
app.post('/servicos', (req, res) => {
    servicosController.inserir(req, res);
})
app.put('/servicos/:id', (req, res) => {
    servicosController.alterar(req, res);
})
app.delete('/servicos/:id', (req, res) => {
    servicosController.apagar(req, res);
})

app.get('/login', (req, res) => {
    pessoaController.loginForm(req, res);
});
app.post('/login', (req, res) => {
    pessoaController.login(req, res);
});

app.get('/teste_bd', async (req, res) => {
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `pessoas` WHERE `ano` > 45'
        );

        res.json(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
    }

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

