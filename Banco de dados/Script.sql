-- BD BodyPedia
create database if not exists bodypedia;
use bodypedia;

-- criando as tabelas
create table usuario(
			 id int primary key auto_increment,
             email varchar(100),
             nome varchar(100),
             senha varchar(20),
);

create table areas (
    id int auto_increment primary key,
    tipoareas varchar(60) not null
);

create table perguntas (
    id int auto_increment primary key,
    titulo varchar(120) not null,
    fk_area int not null,
    foreign key (fk_area) references areas(id)
);

create table opcao (
    id int auto_increment primary key,
    fk_pergunta int not null,
    alternativa varchar(150) not null,
    correta tinyint  not null default 0, -- 0 = falsa | 1 = verdadeira
    foreign key (fk_pergunta) references perguntas(id)
);

create table resposta (
    id int auto_increment primary key,
    fk_usuario int not null,
    fk_opcao int not null,
    acertou tinyint not null default 0,  -- 0 = errou | 1 = acertou
    foreign key (fk_usuario) references usuario(id),
    foreign key (fk_opcao) references opcao(id)
    
);

-- Inserindo dados na tabela Areas

insert into areas (tipoareas) values
  ('treinamento'),
  ('alimentacao'),
  ('diversos');

-- Inserindo dados de perguntas e opções

-- 1.1 Treinamento

insert into perguntas (titulo, fk_area)
select 'Qual o foco do método Heavy Duty?', id from areas where tipoareas = 'treinamento';

insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Volume alto de treino', 0 from perguntas where titulo = 'Qual o foco do método Heavy Duty?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Repetições explosivas e curtas', 0 from perguntas where titulo = 'Qual o foco do método Heavy Duty?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Poucas séries até a falha total', 1 from perguntas where titulo = 'Qual o foco do método Heavy Duty?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Treino com descanso ativo', 0 from perguntas where titulo = 'Qual o foco do método Heavy Duty?';

insert into perguntas (titulo, fk_area)
select 'O que caracteriza um treino com base na biomecânica correta?', id from areas where tipoareas = 'treinamento';

insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Realizar mais repetições que o normal', 0 from perguntas where titulo = 'O que caracteriza um treino com base na biomecânica correta?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Executar os movimentos respeitando ângulos e alavancas do corpo', 1 from perguntas where titulo = 'O que caracteriza um treino com base na biomecânica correta?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Treinar com máxima velocidade sempre', 0 from perguntas where titulo = 'O que caracteriza um treino com base na biomecânica correta?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Utilizar apenas o peso corporal', 0 from perguntas where titulo = 'O que caracteriza um treino com base na biomecânica correta?';

insert into perguntas (titulo, fk_area)
select 'Por que o descanso entre os treinos é essencial para a evolução?', id from areas where tipoareas = 'treinamento';

insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Evita o ganho de gordura', 0 from perguntas where titulo = 'Por que o descanso entre os treinos é essencial para a evolução?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Reduz a fome após o treino', 0 from perguntas where titulo = 'Por que o descanso entre os treinos é essencial para a evolução?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'É quando ocorre a recuperação e o crescimento muscular', 1 from perguntas where titulo = 'Por que o descanso entre os treinos é essencial para a evolução?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Ajuda a manter o foco mental', 0 from perguntas where titulo = 'Por que o descanso entre os treinos é essencial para a evolução?';

insert into perguntas (titulo, fk_area)
select 'O que é overtraining?', id from areas where tipoareas = 'treinamento';

insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Técnica de aumentar repetições', 0 from perguntas where titulo = 'O que é overtraining?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Treinar apenas nos finais de semana', 0 from perguntas where titulo = 'O que é overtraining?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Excesso de treinos sem recuperação adequada', 1 from perguntas where titulo = 'O que é overtraining?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Comer carboidratos antes de dormir', 0 from perguntas where titulo = 'O que é overtraining?';

-- 1.2 Alimentação

insert into perguntas (titulo, fk_area)
select 'O que é a TMB (Taxa Metabólica Basal)?', id from areas where tipoareas = 'alimentacao';

insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Quantidade de calorias que o corpo gasta em repouso', 1 from perguntas where titulo = 'O que é a TMB (Taxa Metabólica Basal)?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Medida do quanto um alimento engorda', 0 from perguntas where titulo = 'O que é a TMB (Taxa Metabólica Basal)?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Percentual de gordura corporal ideal', 0 from perguntas where titulo = 'O que é a TMB (Taxa Metabólica Basal)?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Número de refeições que alguém deve fazer por dia', 0 from perguntas where titulo = 'O que é a TMB (Taxa Metabólica Basal)?';

insert into perguntas (titulo, fk_area)
select 'Quantas calorias tem, em média, 1 grama de gordura?', id from areas where tipoareas = 'alimentacao';

insert into opcao (fk_pergunta, alternativa, correta)
select id, '4 kcal', 0 from perguntas where titulo = 'Quantas calorias tem, em média, 1 grama de gordura?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, '7 kcal', 0 from perguntas where titulo = 'Quantas calorias tem, em média, 1 grama de gordura?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, '9 kcal', 1 from perguntas where titulo = 'Quantas calorias tem, em média, 1 grama de gordura?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, '12 kcal', 0 from perguntas where titulo = 'Quantas calorias tem, em média, 1 grama de gordura?';

insert into perguntas (titulo, fk_area)
select 'Qual o principal papel das proteínas na alimentação de quem treina?', id from areas where tipoareas = 'alimentacao';

insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Reduzir a fome', 0 from perguntas where titulo = 'Qual o principal papel das proteínas na alimentação de quem treina?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Fornecer energia rápida', 0 from perguntas where titulo = 'Qual o principal papel das proteínas na alimentação de quem treina?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Contribuir na construção e recuperação muscular', 1 from perguntas where titulo = 'Qual o principal papel das proteínas na alimentação de quem treina?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Melhorar a digestão', 0 from perguntas where titulo = 'Qual o principal papel das proteínas na alimentação de quem treina?';

insert into perguntas (titulo, fk_area)
select 'Qual combinação de macronutrientes é mais comum em dietas para hipertrofia?', id from areas where tipoareas = 'alimentacao';

insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Pouca proteína e muita gordura', 0 from perguntas where titulo = 'Qual combinação de macronutrientes é mais comum em dietas para hipertrofia?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Alta proteína, baixo carboidrato', 0 from perguntas where titulo = 'Qual combinação de macronutrientes é mais comum em dietas para hipertrofia?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Proteína moderada, carboidrato elevado e gorduras saudáveis', 1 from perguntas where titulo = 'Qual combinação de macronutrientes é mais comum em dietas para hipertrofia?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Só carboidrato e gordura', 0 from perguntas where titulo = 'Qual combinação de macronutrientes é mais comum em dietas para hipertrofia?';

-- 1.3 Diversos 

insert into perguntas (titulo, fk_area)
select 'O que significa o termo ''catabolismo'' no contexto da musculação?', id from areas where tipoareas = 'diversos';

insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Processo de crescimento muscular acelerado', 0 from perguntas where titulo = 'O que significa o termo ''catabolismo'' no contexto da musculação?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Perda de massa muscular por falta de recuperação adequada', 1 from perguntas where titulo = 'O que significa o termo ''catabolismo'' no contexto da musculação?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Estímulo muscular gerado pelos pesos', 0 from perguntas where titulo = 'O que significa o termo ''catabolismo'' no contexto da musculação?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Consumo de gordura durante o treino', 0 from perguntas where titulo = 'O que significa o termo ''catabolismo'' no contexto da musculação?';

insert into perguntas (titulo, fk_area)
select 'É possível eliminar gordura apenas em uma parte específica do corpo?', id from areas where tipoareas = 'diversos';

insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Sim, com exercícios direcionados', 0 from perguntas where titulo = 'É possível eliminar gordura apenas em uma parte específica do corpo?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Não, a queima é geral e controlada por hormônios/genética', 1 from perguntas where titulo = 'É possível eliminar gordura apenas em uma parte específica do corpo?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Sim, com dieta líquida', 0 from perguntas where titulo = 'É possível eliminar gordura apenas em uma parte específica do corpo?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Depende da idade', 0 from perguntas where titulo = 'É possível eliminar gordura apenas em uma parte específica do corpo?';

insert into perguntas (titulo, fk_area)
select 'Quais são riscos comuns do uso de anabolizantes sem orientação?', id from areas where tipoareas = 'diversos';

insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Aumento de energia apenas', 0 from perguntas where titulo = 'Quais são riscos comuns do uso de anabolizantes sem orientação?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Redução da testosterona natural e problemas de saúde', 1 from perguntas where titulo = 'Quais são riscos comuns do uso de anabolizantes sem orientação?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Aumento de massa magra sem efeitos colaterais', 0 from perguntas where titulo = 'Quais são riscos comuns do uso de anabolizantes sem orientação?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Apenas acne e queda de cabelo', 0 from perguntas where titulo = 'Quais são riscos comuns do uso de anabolizantes sem orientação?';

insert into perguntas (titulo, fk_area)
select 'Qual a principal diferença entre fisiculturismo e halterofilismo?', id from areas where tipoareas = 'diversos';

insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Um foca na força, outro na estética muscular', 1 from perguntas where titulo = 'Qual a principal diferença entre fisiculturismo e halterofilismo?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Um é praticado na água, outro na academia', 0 from perguntas where titulo = 'Qual a principal diferença entre fisiculturismo e halterofilismo?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Um usa aparelhos, outro usa pesos livres', 0 from perguntas where titulo = 'Qual a principal diferença entre fisiculturismo e halterofilismo?';
insert into opcao (fk_pergunta, alternativa, correta)
select id, 'Um exige dieta, o outro não', 0 from perguntas where titulo = 'Qual a principal diferença entre fisiculturismo e halterofilismo?';

select count(*) perguntas_total from perguntas;         -- deve dar 12
select fk_area, count(*) qtd from perguntas group by fk_area;
--           1: 4   |   2: 4   |   3: 4

select fk_pergunta, sum(correta) corretas
  from opcao group by fk_pergunta having corretas <> 1;
select * from usuario;
select * from respostas;


