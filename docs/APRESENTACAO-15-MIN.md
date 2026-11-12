# Apresentação — Assistente de Estudos

Objetivo: explicar o que você construiu e provar o consumo de API, sem ler o projeto inteiro. A explicação completa está em EXPLICACAO.md; este é o roteiro de ensaio.

**Estado atual:** teste real ainda depende da chave. O ensaio local usa resposta fixa identificada. Antes da apresentação final, trocar para a integração real e conferir. Se isso não acontecer, dizer explicitamente que o provedor está simulado; não apresentar simulação como objetivo concluído.

## Preparação antes de começar

- Deixar a aplicação aberta e o editor com App.jsx, FormularioPergunta.jsx, Resposta.jsx, services/api.js e api/perguntar.js.
- Abrir também README e os links de GitHub/Vercel quando publicados.
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

Apontar campo, botão e painel. Não falar de dashboards, histórico ou recursos que não existem.

## 01:00–03:00 — demonstração

Digitar a pergunta preparada. Antes de clicar:

“Ao digitar, o texto já está sendo guardado no estado do React. A API só será chamada quando eu enviar.”

Clicar uma vez. Enquanto carrega:

“Agora o estado carregando mudou para verdadeiro. O botão mostra Consultando e fica desabilitado, assim como o campo. A requisição ocorre sem recarregar a página.”

Após resposta real:

“A resposta voltou do servidor. O React guardou o texto no estado e atualizou este painel. Uma nova pergunta substitui esta resposta; o aplicativo não mantém uma conversa.”

**No ensaio sem chave, substituir a fala acima:** “Esta resposta está simulada para testar o fluxo local. Ela é fixa e está identificada na tela. Ainda não demonstra uma chamada real à OpenAI.”

Se o serviço falhar no dia, mostrar a mensagem e explicar o tratamento. Não repetir cliques indefinidamente, nem dizer que houve resposta real se não houve.

## 03:00–04:30 — componentes

Mostrar imports e JSX do App:

“O App coordena os dados. Separei o formulário e a resposta em componentes para cada um ter uma responsabilidade. O Painel é reutilizado duas vezes. Ele recebe o título por props e o conteúdo por children, que é o que colocamos entre as tags do componente.”

Abrir Painel rapidamente e apontar `{titulo}` e `{children}`. Não ler import por import.

## 04:30–06:30 — estados, props e eventos

Apontar os quatro useState:

“Pergunta guarda o que foi digitado. Resposta guarda o texto retornado. Carregando indica se a consulta está em andamento. Erro guarda uma mensagem de falha. Cada estado vem com uma função de atualização. Quando uso setPergunta, o React refaz a parte necessária da interface.”

Abrir formulário:

“O campo é controlado: value recebe pergunta, e onChange chama a função que atualiza esse estado. As funções chegam por props do App. O componente do formulário não precisa conhecer a chave nem a URL da OpenAI.”

Apontar onSubmit e preventDefault:

“O envio chama enviarPergunta. preventDefault evita o comportamento tradicional do formulário, que recarregaria ou navegaria a página. Eu passo a função ao evento, sem executá-la na renderização.”

## 06:30–09:00 — a parte central: HTTP

Abrir services/api.js:

“Aqui configurei o Axios com a base /api. Quando chamo /perguntar, o endereço final é /api/perguntar, dentro do mesmo site.”

Voltar à função no App:

“Uso POST porque estou enviando uma pergunta no corpo da requisição. Este objeto com a propriedade pergunta é enviado em JSON. A chamada retorna uma Promise, então a resposta não chega imediatamente.”

Apontar then/catch:

“No then trato sucesso. O Axios já disponibiliza o JSON convertido em retorno.data; por isso acesso retorno.data.resposta. Guardo o texto com setResposta e encerro o carregamento. No catch trato falha de rede ou resposta HTTP de erro e também libero a tela para tentar novamente.”

“Não usei useEffect porque a consulta não precisa acontecer ao abrir a página nem a cada mudança do texto: ela acontece por uma ação explícita no formulário.”

## 09:00–11:00 — por que existe servidor

Abrir api/perguntar.js:

“Esta função é a parte adicional ao conteúdo de React. Ela existe para proteger a chave. Se a chave fosse colocada no frontend, qualquer pessoa poderia inspecioná-la no navegador. O React chama a nossa função; somente a função chama a OpenAI.”

Apontar validação, process.env, Axios POST e retorno:

“A função verifica o método e a pergunta. Lê a chave do ambiente do servidor, envia a pergunta no campo input e define instruções para uma explicação curta em português. O modelo está fixado no servidor. A resposta da OpenAI tem vários campos; retiro só o texto e devolvo um JSON simples ao React.”

“Também existe limite de tamanho e de tempo. Eles evitam uma consulta muito grande ou uma espera indefinida, mas não são um controle de gasto acumulado.”

Não abrir o valor de nenhuma variável. Não afirmar que as validações impedem todo abuso.

## 11:00–12:00 — condicionais e falhas

Abrir Resposta.jsx:

“Esse componente verifica quatro situações: espera, erro, resposta e estado inicial. São condições que escolhem qual JSX devolver. O botão também usa um ternário para mudar seu texto.”

Na tela, apagar a pergunta e tentar enviar:

“Aqui a validação impede uma consulta vazia. Também valido no servidor porque alguém poderia chamar a rota sem usar esse formulário.”

## 12:00–13:00 — execução e entrega

Mostrar README e links já publicados, se existirem:

“O README explica instalação, execução e as bibliotecas. React constrói a interface; ReactDOM monta a aplicação; Axios realiza HTTP; Vite prepara o ambiente e o build. O ZIP não leva node_modules nem chave. As bibliotecas são recuperadas com npm ci, a partir do lockfile.”

Não mostrar links como prontos se ainda estiverem pendentes. Se estiver usando modo demo, reafirmar isso.

## 13:00–14:00 — fechamento

“O fluxo principal é: evento de envio, validação, POST, resposta JSON, atualização do estado e renderização. A aplicação não armazena conversas e não acessa o Moodle. As respostas precisam ser conferidas com o material da disciplina. Mantive o React dentro dos recursos estudados e separei a função necessária para a credencial.”

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
| Por que não usou map? | Não há lista de respostas; mostro um texto por vez |
| Para que serve o catch? | Tratar falha da Promise, inclusive HTTP de erro tratado pelo Axios |
| Onde está a chave? | Somente no ambiente do servidor; não está no bundle, ZIP ou repositório |
| Um .env no React esconderia a chave? | Não. Valores incluídos no código de navegador ficam acessíveis ao usuário |
| O app guarda a conversa? | Não. Cada chamada é independente; recarregar perde os estados |
| A IA conhece as aulas? | Não automaticamente. Não conectamos Moodle nem documentos ao modelo |
| A resposta é garantidamente correta? | Não. É necessário conferir com as fontes da disciplina |
| Como foi testado sem chave? | Com substituto local explicitamente simulado e testes da função sem rede |
| O teste simulado comprova consumo real? | Não. Esse teste só poderá ser confirmado depois da chave válida |
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

## Roteiro atualizado para o chat — use esta sequência
- 0–2 min: objetivo acadêmico: enviar dúvidas de estudo a uma API e mostrar respostas.
- 2–4 min: demonstrar uma pergunta e uma continuação. Se estiver em demo, avisar explicitamente que são respostas fixas, sem OpenAI. Mostrar o aviso de memória de três trocas.
- 4–7 min: abrir App.jsx: quatro estados, formulário controlado, preventDefault, validação, carregamento e Axios POST. Explicar que o histórico acompanha a pergunta.
- 7–9 min: abrir Resposta.jsx: props, map, key e condições. Cada mensagem tem autor e texto; CSS diferencia as duas classes.
- 9–11 min: explicar slice(-6), spread e atualização da lista no sucesso; erro preserva campo para nova tentativa. Atualizar a página perde a conversa.
- 11–13 min: explicar servidor como exceção: recebe JSON, valida, usa chave privada e chama OpenAI. Retorna texto ou erro; chave nunca vai ao React.
- 13–15 min: limites, testes e perguntas. Não há banco/login/persistência. Contexto aumenta consumo. Integração real só pode ser afirmada após chave válida e teste.

Perguntas: “Onde está a memória?” No useState do navegador; as últimas três trocas são reenviadas. “Por que map?” Para gerar os blocos de mensagens a partir do array. “Por que key pelo índice?” A lista só cresce no final. “Por que não useEffect?” O envio depende de um evento explícito. “Por que servidor?” Para proteger a chave. Estude também CHAT.md, que explica cada alteração.

Mascote: no canto superior direito da caixa da conversa, explicar brevemente que é uma imagem estática com img, src, alt e CSS; não participa da chamada à API e não exige novo conceito React.


Na demonstração, apresente as três áreas: cabeçalho, conversa e formulário. Explique o alinhamento dos autores e o empilhamento do botão no celular como CSS, sem novos recursos React.
