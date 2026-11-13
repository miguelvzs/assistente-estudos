# Base de conteúdos do semestre (sugestões do IFAI)

Pedido de Miguel em 13/11/2026: perguntas sugeridas com os conteúdos do 2º semestre de ADS (IFSP Bragança Paulista, 2026.2).

- Código: `src/conteudo/semestre.js` (dados) e `src/components/Sugestoes.jsx` (tela).
- Origem dos temas: títulos das aulas e atividades publicadas no Moodle de cada disciplina, levantados em out–nov/2026.
- As perguntas foram escritas a partir desses temas; não são questões de prova.
- Tela inicial: filtro “Todas” mostra uma pergunta por matéria; cada filtro mostra as quatro perguntas da matéria. No celular aparecem três cartões. Clicar envia a pergunta.

| Matéria | Temas usados |
|---|---|
| Desenvolvimento Web Front End | Introdução ao React, componentes, props, props e children, renderização, eventos, estados (useState), requisições HTTP (Axios) |
| Programação Orientada a Objetos (Python) | Classes e objetos, `__init__`/`self`, atributos e métodos, `__str__`/`__repr__`, herança e `super()`, associação, módulos, encapsulamento, arquivos texto |
| Banco de Dados 1 | Modelagem, transformação do modelo, SQL (criação, manipulação, agregação, JOIN, datas), normalização |
| Engenharia de Software | Introdução, processos de software, engenharia, elicitação e análise de requisitos, caso de uso, documento Volere |
| Interação Humano-Computador | Histórico, mapa de empatia, design centrado no usuário, persona, arquitetura da informação, prototipação |
| Extensão como Metodologia de Ensino 2 | Papel da extensão, Kanban, Flask, SQLAlchemy com MySQL, gestão de projeto, banner da EXPOEXT |

Para editar: alterar `temas` ou `perguntas` em `semestre.js`. Manter quatro perguntas por matéria (o layout espera esse número).
