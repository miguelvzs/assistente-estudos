// Base de conteúdos do 2º semestre de ADS (IFSP Bragança Paulista, 2026.2).
// Temas tirados dos títulos das aulas e atividades publicadas no Moodle de cada disciplina.
// As perguntas são sugestões de estudo escritas a partir desses temas. Ver docs/CONTEUDOS-SEMESTRE.md.

export const materias = [
  {
    id: 'front',
    sigla: 'Front End',
    nome: 'Desenvolvimento Web Front End',
    temas: ['Introdução ao React', 'Componentes', 'Props', 'Props e children', 'Renderização condicional e listas', 'Eventos', 'Estados (useState)', 'Requisições HTTP (Axios)'],
    perguntas: [
      'O que são props e children no React? Dê um exemplo simples.',
      'Como funciona o useState? Mostre um contador em React.',
      'Como renderizar uma lista com map e key no React?',
      'Como fazer uma requisição GET com Axios e mostrar o resultado na tela?',
    ],
  },
  {
    id: 'poo',
    sigla: 'POO',
    nome: 'Programação Orientada a Objetos (Python)',
    temas: ['Classes e objetos', '__init__ e self', 'Atributos e métodos', '__str__ e __repr__', 'Herança e super()', 'Associação', 'Módulos e import', 'Encapsulamento', 'Arquivos texto'],
    perguntas: [
      'Explique classe, objeto, __init__ e self em Python com um exemplo.',
      'Como funciona herança com super().__init__() em Python?',
      'Qual a diferença entre _atributo e __atributo em Python?',
      'Para que servem __str__ e __repr__ em uma classe Python?',
    ],
  },
  {
    id: 'bd1',
    sigla: 'BD1',
    nome: 'Banco de Dados 1',
    temas: ['Modelagem', 'Transformação do modelo', 'SQL: criação de tabelas', 'Manipulação de dados', 'Agregação (GROUP BY)', 'Ligação de tabelas (JOIN)', 'Datas', 'Normalização'],
    perguntas: [
      'Qual a diferença entre INNER JOIN e LEFT JOIN? Dê um exemplo em SQL.',
      'Como usar GROUP BY com HAVING em SQL? Mostre um exemplo.',
      'Explique 1FN, 2FN e 3FN com um exemplo de tabela.',
      'Como transformar um relacionamento N:N do modelo conceitual em tabelas?',
    ],
  },
  {
    id: 'enso',
    sigla: 'Eng. Software',
    nome: 'Engenharia de Software',
    temas: ['Introdução à Engenharia de Software', 'Processos de software', 'Engenharia de requisitos', 'Técnicas de elicitação', 'Análise de requisitos', 'Diagrama de caso de uso', 'Documento de requisitos (Volere)'],
    perguntas: [
      'Qual a diferença entre requisito funcional e não funcional? Dê exemplos.',
      'Quais técnicas de elicitação de requisitos existem e quando usar cada uma?',
      'Como montar um diagrama de caso de uso? Explique atores e casos.',
      'Compare os processos de software cascata e incremental.',
    ],
  },
  {
    id: 'ihc',
    sigla: 'IHC',
    nome: 'Interação Humano-Computador',
    temas: ['Histórico e perspectivas', 'Mapa de empatia', 'Design centrado no usuário', 'Persona', 'Arquitetura da informação', 'Prototipação'],
    perguntas: [
      'O que é design centrado no usuário? Dê um exemplo prático.',
      'Como criar uma persona para um aplicativo de estudos?',
      'Como preencher um mapa de empatia? Explique cada quadrante.',
      'Qual a diferença entre protótipo de baixa e de alta fidelidade?',
    ],
  },
  {
    id: 'ext2',
    sigla: 'Extensão 2',
    nome: 'Extensão como Metodologia de Ensino 2',
    temas: ['Papel da extensão na formação', 'Método Kanban', 'Flask', 'SQLAlchemy com MySQL', 'Gestão de projeto de software', 'Banner da EXPOEXT'],
    perguntas: [
      'Qual o papel da extensão na formação universitária?',
      'Como funciona o método Kanban? Monte um quadro para um projeto.',
      'Como criar uma rota simples no Flask que devolve JSON?',
      'Como mapear uma tabela com SQLAlchemy usando MySQL?',
    ],
  },
];
