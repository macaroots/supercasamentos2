import mysql.connector

id = int(input('Id: '))

conexao = mysql.connector.connect(host="localhost", user='root', password='admin', database='supercasamentos2', collation="utf8mb4_unicode_ci", charset="utf8mb4")
cursor = conexao.cursor()

sql = ("SELECT * FROM pessoas WHERE id=%s ")

cursor.execute(sql, (id,))

print(f"{'id'}\t{'nome'}\t{'ano'}")
(id, nome, ano, senha) = cursor.fetchone()
print(f"{id}\t{nome}\t{ano}")

cursor.close()
conexao.close()