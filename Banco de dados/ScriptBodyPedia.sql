-- BD BodyPedia
-- drop database bodypedia;
create database if not exists bodypedia;
use bodypedia;

-- criando as tabelas
create table usuario(
			 id int primary key auto_increment,
             email varchar(100),
             nome varchar(100),
             senha varchar(20)
);
select * from usuario;

create table pergunta (
    id int primary key auto_increment,
    titulo varchar(100),
    area   enum('Treino','Nutrição','Complementar')
);
select * from pergunta;

create table resposta (
    id int primary key auto_increment,
    resposta_usuario varchar(10),
    resposta_correta varchar(10),
    acertou tinyint,
    fk_usuario int,
    fk_pergunta int,
    foreign key (fk_usuario) references usuario(id),
    foreign key (fk_pergunta) references pergunta(id)
);
desc resposta;

-- inserindo dados das perguntas 
insert into pergunta (titulo, area) values
 ("O método Heavy Duty foca em poucas séries até a falha total.", 'Treino'),
 ("Treinar sem descanso melhora os resultados de hipertrofia.",    'Treino'),
 ("Overtraining é o excesso de treinos sem recuperação adequada.", 'Treino'),

 ("A TMB representa as calorias gastas em repouso pelo corpo.",    'Nutrição'),
 ("1 grama de gordura possui aproximadamente 4 kcal.",             'Nutrição'),
 ("As proteínas auxiliam na construção e recuperação muscular.",   'Nutrição'),

 ("Uma dieta de hipertrofia costuma ter proteína moderada e carboidratos elevados.", 'Complementar'),
 ("É possível eliminar gordura localizada apenas com exercícios de uma região.",     'Complementar'),
 ("O sono libera hormônios importantes para recuperação e crescimento muscular.",    'Complementar');

-- Select acertos por áre
SELECT p.area, SUM(r.acertou) AS acertos
        FROM (
            SELECT *
            FROM resposta as r
            WHERE fk_usuario = 1
            ORDER BY id DESC
            LIMIT 9
        ) r
        JOIN pergunta p ON r.fk_pergunta = p.id
        GROUP BY p.area;

-- Select acertos e erros
SELECT SUM(acertou) AS acertos, SUM(NOT acertou) AS erros
        FROM (
            SELECT acertou
            FROM resposta
            WHERE fk_usuario = 1
            ORDER BY id DESC
            LIMIT 9
        ) AS ultimas;
        
/* === Usuários de teste ======================================= */
INSERT INTO usuario (email, senha)
VALUES 
  ('ana@bodypedia.com',   '123456'),
  ('bruno@bodypedia.com', '123456'),
  ('carla@bodypedia.com', '123456'),
  ('diego@bodypedia.com', '123456'),
  ('eva@bodypedia.com',   '123456');

/* === Respostas de teste (12 perguntas) ======================= */
/* Formato: (fk_usuario, pergunta, resposta)  ––  resposta = 'Certo' | 'Errado' */

INSERT INTO respostas (fk_usuario, pergunta, resposta) VALUES
-- Ana  –– acertou 10 → perfil “Avançado”
(1,  1, 'Certo'), (1,  2, 'Certo'), (1,  3, 'Errado'),
(1,  4, 'Certo'), (1,  5, 'Certo'), (1,  6, 'Certo'),
(1,  7, 'Certo'), (1,  8, 'Certo'), (1,  9, 'Certo'),
(1, 10, 'Certo'), (1, 11, 'Certo'), (1, 12, 'Errado'),

-- Bruno –– acertou 6 → perfil “Intermediário”
(2,  1, 'Errado'), (2,  2, 'Certo'),  (2,  3, 'Certo'),
(2,  4, 'Errado'), (2,  5, 'Certo'),  (2,  6, 'Certo'),
(2,  7, 'Errado'), (2,  8, 'Certo'),  (2,  9, 'Errado'),
(2, 10, 'Certo'),  (2, 11, 'Errado'), (2, 12, 'Errado'),

-- Carla –– acertou 3 → perfil “Iniciante”
(3,  1, 'Certo'),  (3,  2, 'Errado'), (3,  3, 'Errado'),
(3,  4, 'Errado'), (3,  5, 'Errado'), (3,  6, 'Certo'),
(3,  7, 'Errado'), (3,  8, 'Errado'), (3,  9, 'Errado'),
(3, 10, 'Certo'),  (3, 11, 'Errado'), (3, 12, 'Errado'),

-- Diego –– acertou 8 → perfil “Intermediário”
(4,  1, 'Certo'),  (4,  2, 'Certo'),  (4,  3, 'Certo'),
(4,  4, 'Errado'), (4,  5, 'Certo'),  (4,  6, 'Errado'),
(4,  7, 'Certo'),  (4,  8, 'Certo'),  (4,  9, 'Errado'),
(4, 10, 'Certo'),  (4, 11, 'Certo'),  (4, 12, 'Errado'),

-- Eva  –– acertou 12 → perfil “Avançado”
(5,  1, 'Certo'), (5,  2, 'Certo'), (5,  3, 'Certo'),
(5,  4, 'Certo'), (5,  5, 'Certo'), (5,  6, 'Certo'),
(5,  7, 'Certo'), (5,  8, 'Certo'), (5,  9, 'Certo'),
(5, 10, 'Certo'), (5, 11, 'Certo'), (5, 12, 'Certo');
