import mysql.connector

conexao = mysql.connector.connect(host="localhost", user='root', password='admin', database='supercasamentos2', collation="utf8mb4_unicode_ci", charset="utf8mb4")
cursor = conexao.cursor()

sql = ("SELECT * FROM pessoas ")

cursor.execute(sql)

print(f"{'id'}\t{'nome'}\t{'ano'}")
for (id, nome, ano, senha) in cursor:
  print(f"{id}\t{nome}\t{ano}")

cursor.close()
conexao.close()