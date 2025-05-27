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
 select * from pergunta;

-- verificando se os dados foram inseridos
SELECT * FROM resposta ORDER BY id DESC LIMIT 10;
-- fornece diretamente os números para Radar, Erros por Área etc.
SELECT p.area,
       SUM(r.acertou)                        AS acertos,
       SUM(NOT r.acertou)                    AS erros
FROM   quiz_resposta r
JOIN   pergunta p ON p.id = r.fk_pergunta
WHERE  r.fk_usuario = ?
GROUP  BY p.area;
-- Acertos/Erros por Area
SELECT  p.area,
        SUM(r.acertou)            AS acertos,
        SUM(NOT r.acertou)        AS erros
FROM    resposta r
JOIN    pergunta p ON p.id = r.fk_pergunta
WHERE   r.fk_usuario = ?
GROUP BY p.area;
-- Top-5 perguntas mais erradas
SELECT  p.titulo,
        count(NOT r.acertou) AS erros
FROM    resposta r
JOIN    pergunta p ON p.id = r.fk_pergunta
WHERE   r.fk_usuario = 2 -- (substitua r.fk_usuario = ? por WHERE 1 se quiser estatística geral)
GROUP BY p.id
ORDER BY erros DESC
LIMIT 5;

truncate table resposta;
select * from resposta;

-- teste nova resposta inserida com sucesso
SELECT r.*, p.titulo, p.area
FROM   resposta r
JOIN   pergunta p ON p.id = r.fk_pergunta
WHERE  r.fk_usuario = 1     -- troque pelo seu id
ORDER  BY p.area desc;

select distinct count(usuario.id)
from usuario;


