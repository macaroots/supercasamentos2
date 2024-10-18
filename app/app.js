const http = require('http'); 

const PORT = 3000;
const server = http.createServer(function processaRequisicao(request, response) {
    const url = request.url;

    if (url == '/index' || url == '/') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(`
            <form action="/idade" method="post">
                <label>
                    <span>Nome</span>
                    <input name="nome" />
                </label>
                <label>
                    <span>Ano</span>
                    <input name="ano" type="number" />
                </label>
        `);
        for (let i = 0; i < 10; i++) {
            response.write(`
                    <label>
                        <span>Nome ${i}</span>
                        <input name="nome${i}" />
                    </label>
            `);
        }
        response.write(`
                <button>Enviar</button>
            </form>
        `);
        response.end();
    }
    else if (url == '/idade') {
        let rawBody = '';
        request.on('data', (chunk) => {
            rawBody += chunk;
        });
        request.on('end', () => {
            console.log('raw', rawBody);
            let body = urlDecode(rawBody);
            console.log('parsed', body);

            let ano = parseInt(body.ano);
            let idade = 2024 - ano;

            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write(`Olá, ${body.nome}! Você nasceu em ${body.ano}. Tem ${idade} anos!\n`)
            response.end();
        });
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('Não encontrado!\n')
        response.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

function urlDecode(urlEncoded) {
    let json = {};
    for (let variaveis of urlEncoded.split('&')) {
        let [variavel, valor] = variaveis.split('=');
        json[variavel] = valor;
    }
    return json;
}
