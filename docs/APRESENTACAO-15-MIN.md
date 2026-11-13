# Apresentação — Assistente de Estudos

Objetivo: explicar o que você construiu e provar o consumo de API, sem ler o projeto inteiro. A explicação completa está em EXPLICACAO.md; este é o roteiro de ensaio.

**Estado atual:** teste real local confirmado com gpt-6-luna. npm run demo usa resposta fixa identificada; npm run dev usa a integração real quando recebe as credenciais do servidor. Conferir o modo antes de apresentar. Se isso não acontecer, dizer explicitamente que o provedor está simulado; não apresentar simulação como objetivo concluído.

## Preparação antes de começar

- Deixar a aplicação aberta e o editor com App.jsx, FormularioPergunta.jsx, Resposta.jsx, services/api.js e api/perguntar.js.
- Abrir também README e o GitHub publicado; Vercel apenas quando disponível.
- Aumentar a fonte do editor para a turma enxergar.
- Não abrir cofre, credenciais, terminal com segredos ou configurações que revelem a chave.
- Preparar uma pergunta: “Qual é a diferença entre props e state no React? Dê um exemplo simples.”
- Ensaiar uma vez com cronômetro. Se passar de 13 minutos antes das perguntas, cortar detalhes de CSS/configuração, não a explicação do POST.

## Agenda exata de 15 minutos

| Tempo | O que mostrar | Mensagem principal |
|---|---|---|
| 00:00–01:00 | Tela inicial | Problema, objetivo e escopo |
| 01:00–03:00 | Digitar, enviar, aguardar resposta | Demonstração do fluxo |
| 03:00–04:30 | App e árvore de componentes | Organização da interface |
| 04:30–06:30 | useState e FormularioPergunta | Estado, props e eventos |
| 06:30–09:00 | enviarPergunta e services/api.js | POST, JSON, Promise e resposta |
| 09:00–11:00 | api/perguntar.js | Servidor, chave e chamada à OpenAI |
| 11:00–12:00 | Resposta e teste vazio | Condicionais e erros |
| 12:00–13:00 | README, GitHub e Vercel | Execução e entrega |
| 13:00–14:00 | Síntese e limitações | O que foi aprendido e o que não faz |
| 14:00–15:00 | Perguntas | Margem para diálogo |

## 00:00–01:00 — abertura

“Meu projeto é um Assistente de Estudos. O objetivo da atividade é consumir uma API usando React. A pessoa escreve uma dúvida e recebe uma explicação curta com um exemplo. Escolhi a OpenAI, com autorização da professora. Mantive uma tela e uma consulta por vez para focar no fluxo de requisição e resposta.”

Apontar campo, botão e painel. Mostrar a conversa; não apresentar recursos que não existem, como banco ou login.

## 01:00–03:00 — demonstração

Digitar a pergunta preparada. Antes de clicar:

“Ao digitar, o texto já está sendo guardado no estado do React. A API só será chamada quando eu enviar.”

Clicar uma vez. Enquanto carrega:

“Agora o estado carregando mudou para verdadeiro. O botão mostra Respondendo... e fica desabilitado, assim como o campo. A requisição ocorre sem recarregar a página.”

Após resposta real:

“A resposta voltou do servidor. O React acrescentou a pergunta e a resposta à lista de mensagens. A próxima chamada envia as últimas três trocas como contexto.”

**No ensaio sem chave, substituir a fala acima:** “Esta resposta está simulada para testar o fluxo local. Ela é fixa e está identificada na tela. Ainda não demonstra uma chamada real à OpenAI.”

Se o serviço falhar no dia, mostrar a mensagem e explicar o tratamento. Não repetir cliques indefinidamente, nem dizer que houve resposta real se não houve.

## 03:00–04:30 — componentes

Mostrar imports e JSX do App:

“O App coordena os dados. Separei o formulário e a resposta em componentes para cada um ter uma responsabilidade. O Painel envolve a conversa e o formulário uma vez. Ele recebe o título por props e o conteúdo por children, que é o que colocamos entre as tags do componente.”

Abrir Painel rapidamente e apontar `{titulo}` e `{children}`. Não ler import por import.

## 04:30–06:30 — estados, props e eventos

Apontar os quatro useState:

“Pergunta guarda o que foi digitado. Mensagens guarda a lista de perguntas e respostas. Carregando indica se a consulta está em andamento. Erro guarda uma mensagem de falha. Cada estado vem com uma função de atualização. Quando uso setPergunta, o React refaz a parte necessária da interface.”

Abrir formulário:

“O campo é controlado: value recebe pergunta, e onChange chama a função que atualiza esse estado. As funções chegam por props do App. O componente do formulário não precisa conhecer a chave nem a URL da OpenAI.”

Apontar onSubmit e preventDefault:

“O envio chama enviarPergunta. preventDefault evita o comportamento tradicional do formulário, que recarregaria ou navegaria a página. Eu passo a função ao evento, sem executá-la na renderização.”

## 06:30–09:00 — a parte central: HTTP

Abrir services/api.js:

“Aqui configurei o Axios com a base /api. Quando chamo /perguntar, o endereço final é /api/perguntar, dentro do mesmo site.”

Voltar à função no App:

“Uso POST porque estou enviando uma pergunta no corpo da requisição. O objeto com pergunta e historico é enviado em JSON. A chamada retorna uma Promise, então a resposta não chega imediatamente.”

Apontar then/catch:

“No then trato sucesso. O Axios já disponibiliza o JSON convertido em retorno.data; por isso acesso retorno.data.resposta. Acrescento a troca com setMensagens e limpo o campo com setPergunta e encerro o carregamento. No catch trato falha de rede ou resposta HTTP de erro e também libero a tela para tentar novamente.”

“Não usei useEffect porque a consulta não precisa acontecer ao abrir a página nem a cada mudança do texto: ela acontece por uma ação explícita no formulário.”

## 09:00–11:00 — por que existe servidor

Abrir api/perguntar.js:

“Esta função é a parte adicional ao conteúdo de React. Ela existe para proteger a chave. Se a chave fosse colocada no frontend, qualquer pessoa poderia inspecioná-la no navegador. O React chama a nossa função; somente a função chama a OpenAI.”

Apontar validação, process.env, Axios POST e retorno:

“A função verifica o método e a pergunta. Lê a chave do ambiente do servidor, envia a lista de contexto e a pergunta no campo input e define instruções para uma explicação curta em português. O modelo está fixado no servidor. A resposta da OpenAI tem vários campos; retiro só o texto e devolvo um JSON simples ao React.”

“Também existe um limite compartilhado de 50 consultas por dia. Antes de chamar a IA, o servidor reserva uma vaga num contador privado. Ele sobrevive a reinícios e deploys. Se não for possível conferir a contagem, a consulta é bloqueada. Essa infraestrutura foi construída com pesquisa e assistência de IA; não faz parte das aulas de React.”

Não abrir o valor de nenhuma variável. Não afirmar que as validações impedem todo abuso.

## 11:00–12:00 — condicionais e falhas

Abrir Resposta.jsx:

“Esse componente verifica quatro situações: espera, erro, resposta e estado inicial. map transforma a lista em blocos; condições mostram os estados adicionais sem apagar a conversa. O botão também usa um ternário para mudar seu texto.”

Na tela, apagar a pergunta e tentar enviar:

“Aqui a validação impede uma consulta vazia. Também valido no servidor porque alguém poderia chamar a rota sem usar esse formulário.”

## 12:00–13:00 — execução e entrega

Mostrar README e links já publicados, se existirem:

“O README explica instalação, execução e as bibliotecas. React constrói a interface; ReactDOM monta a aplicação; Axios realiza HTTP; Vite prepara o ambiente e o build. O ZIP não leva node_modules nem chave. As bibliotecas são recuperadas com npm ci, a partir do lockfile.”

Não mostrar links como prontos se ainda estiverem pendentes. Se estiver usando modo demo, reafirmar isso.

## 13:00–14:00 — fechamento

“O fluxo principal é: evento de envio, validação, POST, resposta JSON, atualização do estado e renderização. A aplicação mantém a conversa apenas em memória e não acessa o Moodle. As respostas precisam ser conferidas com o material da disciplina. Mantive o React dentro dos recursos estudados e separei a função necessária para a credencial.”

## 14:00–15:00 — perguntas possíveis

| Pergunta | Resposta que você deve entender |
|---|---|
| Onde a API é consumida? | Há duas chamadas HTTP: React chama nossa função; nossa função chama a OpenAI |
| Por que Axios? | Foi estudado na Aula 09 e facilita POST, resposta em data e tratamento de erro |
| Por que POST e não GET? | A operação envia uma pergunta no corpo para gerar uma resposta |
| Qual a diferença entre props e state? | Estado pertence ao componente que o mantém; props são valores recebidos do pai |
| Onde fica o estado? | No App; os filhos recebem valores e funções por props |
| O que é children? | Conteúdo colocado entre as tags de um componente, recebido como prop |
| Por que preventDefault? | Para evitar o envio tradicional do formulário e manter o fluxo no React |
| Por que não usou useEffect? | O envio é um evento; não preciso de consulta automática ou sincronização |
| Por que usou map? | Para transformar cada mensagem da lista em um bloco na tela; key identifica cada item |
| Para que serve o catch? | Tratar falha da Promise, inclusive HTTP de erro tratado pelo Axios |
| Onde está a chave? | Somente no ambiente do servidor; não está no bundle, ZIP ou repositório |
| Um .env no React esconderia a chave? | Não. Valores incluídos no código de navegador ficam acessíveis ao usuário |
| O app guarda a conversa? | Apenas enquanto a página está aberta; últimas três trocas são reenviadas. Recarregar apaga os estados |
| A IA conhece as aulas? | Não automaticamente. Não conectamos Moodle nem documentos ao modelo |
| A resposta é garantidamente correta? | Não. É necessário conferir com as fontes da disciplina |
| Como foi testado sem chave? | Com substituto local explicitamente simulado e testes da função sem rede |
| O teste simulado comprova consumo real? | Não. A chamada real local foi testada separadamente; veja VALIDACAO.md |
| Por que não colocou mais funcionalidades? | Para cumprir o objetivo de consumo de API com o mínimo de conteúdo estudado |

## Checklist de domínio antes de apresentar

Sem olhar este roteiro, conseguir:

1. Desenhar React → função → OpenAI → função → React.
2. Explicar cada um dos quatro estados.
3. Apontar o evento que dispara a requisição.
4. Mostrar onde envia pergunta e onde recebe resposta.
5. Explicar props, children, then, catch e preventDefault.
6. Explicar por que a chave fica fora do navegador.
7. Diferenciar a parte da aula da exceção de servidor.
8. Mostrar uma falha sem travar na explicação.

Se algum ponto ainda depender de decorar palavras, voltar à seção correspondente de EXPLICACAO.md e explicar com o código aberto.

## Apoio visual
Apresente cabeçalho, conversa e formulário. O mascote fica à direita; no celular, o botão ocupa a largura disponível. Veja CHAT.md para explicar slice(-6), spread e map/key.


## Conceito ampliado
Apresente como apoio de estudos gerais aos alunos do IF. Demonstre com matemática ou interpretação de texto e uma continuação, em vez de restringir a conversa a programação. Diferencie o público do produto das tecnologias usadas para construí-lo. Modelo e limites continuam econômicos.

## Assistência e partes adicionais

Fala sugerida: “Usei as aulas para construir a interface React. A integração de
servidor e o controle diário foram feitos com pesquisa e assistência de IA.
Estudei o fluxo: o navegador envia a pergunta, o servidor valida, reserva uma
consulta e chama a OpenAI sem revelar a chave. Essa infraestrutura não foi
ensinada nas aulas de React.”

Não repetir 103 linhas como total atual: essa contagem era da função antes do
limite. Veja INVENTARIO.md. A versão SUAP fica em outra branch, com guia próprio.
