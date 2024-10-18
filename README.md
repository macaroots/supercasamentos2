# SuperCasamentos
É um repositório com fins educativos. Node.js + Docker-Compose.

# Preparar o ambiente
Certifique-se que o Git e Docker-compose estão instalados e configurados. Veja mais [Instalação do Git e Docker-compose](/docs/INSTALACOES.md).

## Clonar repositório base
Passo 1: Crie um repositório para o seu projeto no Github, Gitlab ou similar.

Passo 2: Em seguida, faça um clone do repositório de exemplo em uma pasta com o nome do seu projeto.
```sh
# usando SSH
git clone git@github.com:macaroots/hello_node.git NOVO_PROJETO

# ou usando HTTPS
git clone https://github.com/macaroots/hello_node.git NOVO_PROJETO
```

Altere a URL do repositório remoto apontando para o seu:
```sh
# listar repositórios remotos
git remote -v

# alterar repositório remoto
# git remote set-url NOME URL
git remote set-url origin git@github.com:<USUARIO>/<NOVO_PROJETO>.git
```

Entrar na pasta e iniciar os serviços:
```sh
cd NOVO_PROJETO
docker-compose up
```
```sh
git clone REPO_BASE NOVO_PROJETO
git remote --set-url origin NOVO_REPO # alterar repositório remoto
```

## Configurar porta
A aplicação `app.js` escuta a porta 3000 do container onde ela está sendo executada. Alterando o `docker-compose.yml`, podemos associar a porta 3000 do container a qualquer porta da máquina hospedeira, onde o container está sendo executado.
```yml
    ports:
      - "NOVA_PORTA:3000"
```

## Executar
Para ligar o servidor:
```sh
docker-compose up
```
Para desligar, pressione `ctrl+c`.

## Acessar
Acesse pelo navegador http://localhost:3000.

# Primeiro Servidor Dinâmico
## Estrutura dos arquivos
<pre>
|-- docker-compose.yml (Descreve os containers)
|-- Dockerfile (Instruções para criação da imagem)
|-- .dockerignore (Arquivos ignorados pelo Docker)
|-- .gitignore (Arquivos ignorados pelo Git)
|-- app/
|   |-- <b>app.js (Seu servidor dinâmico)</b>
|   |-- package.json (Descreve seu pacote)
</pre>

Um servidor web é um programa para atender requisições HTTP. O servidor mais simples possível em Node.js (`app.js`) fica assim:
```js
const http = require('http');

const PORT = 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello, ' + req.url + '!\n');
    res.end();
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```
Perceba que declaramos uma função para tratar as requisições e esta função recebe um objeto de requisição (`req`) e outro de resposta (`res`). Escrevemos no cabeçalho da resposta o código de status (200) e o tipo de conteúdo "text/plain" com a função `res.writeHead()`. Escrevemos no corpo da resposta com a função `res.write()`. `res.end()` finaliza a resposta.

## Instalar Nodemon e outras dependências

Experimente alterar o arquivos `app.js` e recarregar a página no navegador. Perceba que nada se altera. É preciso desligar (Ctrl+C) e reiniciar o servidor.

Para evitar ficar reiniciando o servidor o tempo todo, você pode instalar o Nodemon, que fica monitorando quando algum arquivo é modificado e reinicia o servidor automaticamente.

A instalação de pacotes é feita pelo gerenciador de pacotes NPM, com o comando `npm install`. Como a aplicação está rodando dentro do container, vamos ligar o servidor (`docker-compose up`) e executar um comando de instalação dentro do container com `docker exec`. 
```sh
# para executar qualquer comando no container:
# docker exec -it CONTAINER COMANDO
docker exec -it hello_node_node_1 npm install nodemon
```

Abra o arquivo `package.json` e confirme que o Nodemon foi adicionado às dependências do projeto. Em seguida, altere o script de inicialização do servidor para:
```js
  // ...
  "scripts": {
    "start": "nodemon app.js"
  },
  // ...
```

Reinicie o servidor. Repare que ao salvar qualquer arquivo, o servidor é reiniciado automaticamente.