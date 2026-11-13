# Onde cada parte foi ensinada

Material: arquivos `BRADWFR_REACTJS_...` da seção Materiais do Componente Curricular do [curso 587](https://moodle.bra.ifsp.edu.br/course/view.php?id=587). Os nomes abaixo permitem localizar as aulas no Moodle. Esta tabela distingue o React estudado da integração de servidor adicional.

| Conteúdo | Aula/parte | Onde aparece no projeto | Como explicar |
|---|---|---|---|
| Criar app com Vite | Aula02_Introducao-AplicacaoReactJS, §1.4.1 | package.json, index.html, main.jsx | Vite prepara o ambiente; React constrói a tela |
| JSX e expressões | Aula03_Componentes, capítulos 1 e 2 | Todos os arquivos .jsx | JSX descreve a interface; chaves inserem valores JavaScript |
| Funções, import e export | Aula03_Componentes, §1.5 e §2.5 | App e componentes | Cada função exportada pode ser usada em outro arquivo |
| CSS global | Aula03_Componentes, §3.1 | App.css | Classes organizam o estilo sem framework visual |
| Props | Aula04_ReutilizandoComponentes-Props | App → FormularioPergunta/Resposta/Painel | Dados e funções passam do pai para o filho |
| Children | Aula05_ReutilizandoComponentes-Props-Children | Painel | O mesmo painel envolve conteúdos diferentes |
| Condicionais e ternário | Aula06_Renderizacao, capítulo 1 | Resposta; texto do botão | O estado atual decide o que aparece |
| Eventos e formulário | Aula07_Eventos, capítulo 1 | onChange, onSubmit, preventDefault | A ação do usuário executa uma função |
| Estado e campo controlado | Aula08_GerenciandoEstados, capítulo 2 | Quatro useState no App, value no textarea | O estado guarda o valor; atualizar estado atualiza a tela |
| HTTP e Promises | Aula09_RequisicoesHTTP, §§4.2–4.3 | api.post().then().catch() | A resposta chega depois; tratamos sucesso e falha |
| Axios e POST | Aula09_RequisicoesHTTP, §5 | services/api.js e App | Configuramos baseURL e enviamos JSON |
| Componentização | Aula08_PraticaLaboratorio03-Aluno | components/ | Formulário e resposta têm responsabilidades distintas |

## O que não usamos e por quê

- useEffect: não há busca ao montar a página nem sincronização com armazenamento. A consulta nasce do envio do formulário.
- useMemo e useCallback: não há cálculo ou função com custo que justifique otimização.
- filter: não há filtragem de mensagens. map e key são usados na lista da conversa (Aula 06).
- React Router e useParams: há somente uma página.
- localStorage: não guardar perguntas nem respostas.
- Hook próprio e prop-types: desnecessários para quatro estados locais e três componentes simples.
- Fetch no navegador: escolhemos Axios, alternativa estudada na mesma aula.
- PUT e DELETE: não há recurso persistido para editar ou excluir.

## Exceção técnica aceita por Miguel

`api/perguntar.js`: função Vercel, Request/Response do servidor, variável de ambiente, autorização Bearer e formato específico da OpenAI. Axios já está nas aulas; o ambiente de servidor e o contrato da OpenAI não foram encontrados no material React. Não dizer que foram ensinados.

`vite.config.js`, `vercel.json` e `tests/api.test.js`: configuração e verificação auxiliares dessa integração. Não são recursos adicionais do produto nem conteúdo a atribuir à professora.

A aprovação da OpenAI pela professora foi informada por Miguel. O Moodle registra o tema Assistente de Estudos, não o nome do provedor.

`server/limite-diario.js` e `@vercel/blob`: contador persistente, fuso horário e controle de concorrência por ETag. Essa infraestrutura foi adicionada para cumprir as 50 consultas/dia exigidas por Miguel. Está fora das aulas React, assim como a função que protege a chave. Veja LIMITE-DIARIO.md. Os testes e o script de verificação também são auxiliares, não conteúdo atribuído à professora.
