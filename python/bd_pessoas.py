import mysql.connector

class PessoasMysqlStore:
    def __init__(self, conectar):
        self.conectar = conectar

    def listar(self):
        conexao = self.conectar()
        cursor = conexao.cursor()

        sql = ("SELECT * FROM pessoas ")

        cursor.execute(sql)

        pessoas = cursor.fetchall()

        cursor.close()
        conexao.close()
        
        return pessoas

    def inserir(self, pessoa):
        conexao = self.conectar()
        cursor = conexao.cursor()

        sql = ("INSERT INTO pessoas "
                    "VALUES (DEFAULT, %s, %s, %s)")

        # Insert new employee
        cursor.execute(sql, pessoa)
        id_inserido = cursor.lastrowid

        # Make sure data is committed to the database
        conexao.commit()

        cursor.close()
        conexao.close()

        return id_inserido
    
    def procurar(self, id):
        conexao = self.conectar()
        cursor = conexao.cursor()

        sql = ("SELECT * FROM pessoas WHERE id=%s ")

        cursor.execute(sql, (id,))

        registro = cursor.fetchone()

        cursor.close()
        conexao.close()

        return registro

def conectar():
    return mysql.connector.connect(host="localhost", user='root', password='admin', database='supercasamentos2', collation="utf8mb4_unicode_ci", charset="utf8mb4")

store = PessoasMysqlStore(conectar)
while True:
    print('1. Listar 2. Cadastrar 3. Procurar')
    opcao = input()
    if opcao == '1':
        pessoas = store.listar()
        print(f"{'id'}\t{'nome'}\t{'ano'}")
        for (id, nome, ano, senha) in pessoas:
            print(f"{id}\t{nome}\t{ano}")
    elif opcao == '2':
        nome = input('Nome: ')
        ano = input('Ano: ')
        senha = input('Senha: ')
        pessoa = (nome, ano, senha)
        id_inserido = store.inserir(pessoa)
        print(f'Registo #{id_inserido} inserido com sucesso!')
    elif opcao == '3':
        id = int(input('Id: '))
        (id, nome, ano, senha) = store.procurar(id)
        print(f"{id}\t{nome}\t{ano}")
    else:
        break