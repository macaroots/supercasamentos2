CREATE TABLE pessoas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    ano INT,
    senha CHAR(60)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8mb4;

CREATE TABLE servicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    duracao INT,
    preco INT,
    descricao TEXT,
    imagem VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8mb4;