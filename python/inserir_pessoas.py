import mysql.connector

conexao = mysql.connector.connect(host="localhost", user='root', password='admin', database='supercasamentos2', collation="utf8mb4_unicode_ci", charset="utf8mb4")
cursor = conexao.cursor()

sql = ("INSERT INTO pessoas "
               "VALUES (DEFAULT, %s, %s, %s)")
dados = ('Geert', 1299, 'tomorrow')

# Insert new employee
cursor.execute(sql, dados)
id_inserido = cursor.lastrowid

# Make sure data is committed to the database
conexao.commit()

cursor.close()
conexao.close()

print(f'Registo #{id_inserido} inserido com sucesso!')