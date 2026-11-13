# Base de conteúdos do semestre (sugestões do IFAI)

Pedido de Miguel em 13/11/2026: perguntas sugeridas com os conteúdos do 2º semestre de ADS (IFSP Bragança Paulista, 2026.2).

- Código: `src/conteudo/semestre.js` (dados e instruções da IA), `src/components/Sugestoes.jsx` (filtros e cartões) e o seletor de matéria em `FormularioPergunta.jsx`.
- Origem dos temas: títulos das aulas e atividades publicadas no Moodle de cada disciplina, levantados em out–nov/2026.
- As perguntas foram escritas a partir desses temas; não são questões de prova.
- Tela inicial: filtro “Todas” mostra uma pergunta por matéria; cada filtro mostra os temas e as seis perguntas da matéria. No celular aparecem três cartões. Clicar envia a pergunta.
- Contexto da IA: a matéria escolhida (filtro ou seletor acima do campo) vai no POST como `materia`. O servidor só aceita ids da lista e acrescenta às instruções o nome, os temas e as ferramentas da disciplina (React e Axios, Python, MySQL, Volere e UML, PDCA, Flask e SQLAlchemy). Sem matéria, a IA recebe o contexto geral do semestre.
- As instruções também pedem exemplo no nível do 2º semestre e, quando fizer sentido, um exercício curto para praticar, sem a resposta.

| Matéria | Temas usados |
|---|---|
| Desenvolvimento Web Front End | Introdução ao React, componentes, props, props e children, renderização, eventos, estados (useState), requisições HTTP (Axios) |
| Programação Orientada a Objetos (Python) | Classes e objetos, `__init__`/`self`, atributos e métodos, `__str__`/`__repr__`, herança e `super()`, associação, módulos, encapsulamento, arquivos texto |
| Banco de Dados 1 | Modelagem, transformação do modelo, SQL (criação, manipulação, agregação, JOIN, datas), normalização |
| Engenharia de Software | Introdução, processos de software, engenharia, elicitação e análise de requisitos, caso de uso, documento Volere |
| Interação Humano-Computador | Histórico, mapa de empatia, design centrado no usuário, persona, arquitetura da informação, prototipação |
| Extensão como Metodologia de Ensino 2 | Papel da extensão, Kanban, Flask, SQLAlchemy com MySQL, gestão de projeto, banner da EXPOEXT |

Para editar: alterar `temas` ou `perguntas` em `semestre.js`. Manter seis perguntas por matéria (o layout espera esse número). O campo `contexto` vai para a IA: descrever só o que a disciplina usa de fato.
