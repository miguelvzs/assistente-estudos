// Base de conteúdos do 2º semestre de ADS (IFSP Bragança Paulista, 2026.2).
// Temas tirados dos títulos das aulas e atividades publicadas no Moodle de cada disciplina.
// Usada pela tela (sugestões e seletor de matéria) e pelo servidor (contexto enviado à IA).
// As perguntas são sugestões de estudo escritas a partir desses temas. Ver docs/CONTEUDOS-SEMESTRE.md.

export const materias = [
  {
    id: 'front',
    sigla: 'Front End',
    nome: 'Desenvolvimento Web Front End',
    temas: ['introdução ao React', 'componentes', 'props', 'props e children', 'renderização condicional e listas', 'eventos', 'estados com useState', 'requisições HTTP com Axios'],
    contexto: 'As aulas usam React com Vite, componentes de função em JSX, props, children, renderização condicional, map com key, eventos (onClick, onChange, onSubmit), useState e requisições com Axios (GET e POST, then e catch). Use JavaScript e JSX, sem TypeScript e sem bibliotecas fora das aulas.',
    perguntas: [
      'O que são props e children no React? Dê um exemplo simples.',
      'Como funciona o useState? Mostre um contador em React.',
      'Como renderizar uma lista com map e key no React?',
      'Como fazer uma requisição GET com Axios e mostrar o resultado na tela?',
      'Como fazer renderização condicional com && e operador ternário?',
      'Como tratar o onSubmit de um formulário com preventDefault?',
    ],
  },
  {
    id: 'poo',
    sigla: 'POO',
    nome: 'Programação Orientada a Objetos (Python)',
    temas: ['classes e objetos', '__init__ e self', 'atributos e métodos', '__str__ e __repr__', 'herança e super()', 'associação', 'módulos e import', 'encapsulamento', 'arquivos texto'],
    contexto: 'A disciplina usa Python 3: class, __init__, self, atributos com valor padrão, métodos que validam dados, herança com super().__init__(), sobrescrita de métodos, associação (objeto como atributo de outro), módulos com import, encapsulamento por convenção (_atributo e __atributo) com get e set, __str__ e __repr__, leitura e escrita de arquivos texto. Use Python, nunca Java.',
    perguntas: [
      'Explique classe, objeto, __init__ e self em Python com um exemplo.',
      'Como funciona herança com super().__init__() em Python?',
      'Qual a diferença entre _atributo e __atributo em Python?',
      'Para que servem __str__ e __repr__ em uma classe Python?',
      'O que é associação entre classes? Mostre um Carro com uma Bateria.',
      'Como separar classes em módulos e importar em outro arquivo Python?',
    ],
  },
  {
    id: 'bd1',
    sigla: 'BD1',
    nome: 'Banco de Dados 1',
    temas: ['modelagem entidade-relacionamento', 'transformação para o modelo lógico', 'criação de tabelas', 'manipulação de dados', 'agregação com GROUP BY', 'ligação de tabelas com JOIN', 'funções de data', 'normalização'],
    contexto: 'A disciplina usa MySQL com MySQL Workbench: modelagem entidade-relacionamento e transformação para o modelo lógico, CREATE TABLE com chave primária e estrangeira, INSERT, UPDATE e DELETE, SELECT com WHERE e ORDER BY, funções de agregação, GROUP BY e HAVING, INNER, LEFT e RIGHT JOIN, subconsultas, funções de data e normalização (1FN, 2FN, 3FN). Use sintaxe MySQL.',
    perguntas: [
      'Qual a diferença entre INNER JOIN e LEFT JOIN? Dê um exemplo em SQL.',
      'Como usar GROUP BY com HAVING em SQL? Mostre um exemplo.',
      'Explique 1FN, 2FN e 3FN com um exemplo de tabela.',
      'Como transformar um relacionamento N:N do modelo conceitual em tabelas?',
      'Como calcular a idade a partir da data de nascimento no MySQL?',
      'Quando usar uma subconsulta em vez de um JOIN?',
    ],
  },
  {
    id: 'enso',
    sigla: 'Eng. Software',
    nome: 'Engenharia de Software',
    temas: ['introdução à Engenharia de Software', 'processos de software', 'engenharia de requisitos', 'técnicas de elicitação', 'análise de requisitos', 'diagrama de caso de uso', 'documento de requisitos Volere'],
    contexto: 'A disciplina trabalha requisitos aplicados ao projeto de extensão do grupo: requisitos funcionais e não funcionais, técnicas de elicitação, análise de requisitos, diagrama de caso de uso da UML, documento de requisitos no modelo Volere e processos de software.',
    perguntas: [
      'Qual a diferença entre requisito funcional e não funcional? Dê exemplos.',
      'Quais técnicas de elicitação de requisitos existem e quando usar cada uma?',
      'Como montar um diagrama de caso de uso? Explique atores e casos.',
      'Compare os processos de software cascata e incremental.',
      'O que é o modelo Volere de documento de requisitos?',
      'Como escrever um requisito claro e verificável?',
    ],
  },
  {
    id: 'ihc',
    sigla: 'IHC',
    nome: 'Interação Humano-Computador',
    temas: ['histórico e perspectivas', 'mapa de empatia', 'design centrado no usuário', 'persona', 'arquitetura da informação', 'prototipação'],
    contexto: 'A disciplina trabalha histórico da IHC, design centrado no usuário, mapa de empatia, criação de persona, arquitetura da informação (organização, rotulação e navegação) e prototipação de baixa e alta fidelidade, avaliada com o ciclo PDCA.',
    perguntas: [
      'O que é design centrado no usuário? Dê um exemplo prático.',
      'Como criar uma persona para um aplicativo de estudos?',
      'Como preencher um mapa de empatia? Explique cada quadrante.',
      'Qual a diferença entre protótipo de baixa e de alta fidelidade?',
      'Como reorganizar o menu de um site usando arquitetura da informação?',
      'Como usar o ciclo PDCA para melhorar um protótipo?',
    ],
  },
  {
    id: 'ext2',
    sigla: 'Extensão 2',
    nome: 'Extensão como Metodologia de Ensino 2',
    temas: ['papel da extensão na formação', 'método Kanban', 'Flask', 'SQLAlchemy com MySQL', 'gestão de projeto de software', 'banner da EXPOEXT'],
    contexto: 'A disciplina desenvolve um projeto integrado de extensão com a comunidade externa: papel da extensão universitária, gestão com Kanban no Trello, back-end em Python com Flask, banco MySQL acessado com SQLAlchemy, gestão de projeto de software e banner para a mostra EXPOEXT.',
    perguntas: [
      'Qual o papel da extensão na formação universitária?',
      'Como funciona o método Kanban? Monte um quadro para um projeto.',
      'Como criar uma rota simples no Flask que devolve JSON?',
      'Como mapear uma tabela com SQLAlchemy usando MySQL?',
      'Como organizar as tarefas de um projeto de software em equipe?',
      'O que um banner de projeto de extensão precisa ter?',
    ],
  },
];

const base = 'Você é o IFAI, assistente de estudos de alunos do 2º semestre de Análise e Desenvolvimento de Sistemas do IFSP Bragança Paulista. As disciplinas do semestre são: ' +
  materias.map((materia) => materia.nome).join('; ') + '. ' +
  'Responda em português do Brasil, com explicação clara, passos curtos e um exemplo no nível do 2º semestre. ' +
  'Ajude a entender o raciocínio, não só a decorar. Quando fizer sentido, termine com um exercício curto do mesmo tipo para o aluno praticar, sem dar a resposta. ' +
  'Perguntas de outras áreas também podem ser respondidas. Se faltar informação essencial, faça uma pergunta objetiva. ' +
  'Use texto puro, sem Markdown, e até 220 palavras. Não invente fontes, datas, notas, normas ou informações do campus; você não acessa o Moodle nem materiais privados e não é atendimento oficial do IF. Quando não souber, diga.';

// Monta as instruções da IA. O id da matéria vem do navegador, mas só é usado
// se existir nesta lista: o cliente não consegue mandar texto próprio para as instruções.
const treino = ' MODO TREINO: você é um treinador de prova. Proponha UM exercício por vez, no estilo das avaliações da disciplina, e não dê a resposta. Quando o aluno responder, corrija passo a passo: diga o que está certo, aponte o erro, dê uma dica antes de mostrar a solução e então proponha o próximo exercício, um pouco mais difícil. Se o aluno pedir a resposta, mostre com explicação.';

export function montarInstrucoes(idMateria, modo = '') {
  const materia = materias.find((item) => item.id === idMateria);
  const extra = modo === 'treino' ? treino : '';
  if (!materia) return base + extra;
  return base + extra + ' Contexto: o aluno está estudando ' + materia.nome + '. Temas da disciplina: ' + materia.temas.join(', ') + '. ' +
    materia.contexto + ' Relacione a resposta a esses temas e use as ferramentas da disciplina nos exemplos.';
}
