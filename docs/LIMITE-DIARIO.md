# Como funciona o limite de 50 consultas

Esta parte é infraestrutura adicional, construída com pesquisa e assistência de IA.
Não foi encontrada nas aulas React. A interface continua com os mesmos quatro estados.

## Regra para o aluno

Todos compartilham 50 tentativas por dia. A contagem renova à meia-noite de Brasília.
Uma tentativa é contada quando a função consegue reservar a vaga, antes de chamar a
OpenAI. Se a OpenAI falhar ou demorar demais, a vaga continua consumida. Isso evita
repetições cobradas sem contagem. Texto inválido e chave ausente não reservam vagas.

Na 51ª tentativa, o aluno vê o aviso para voltar amanhã. Se o contador não responder,
o app pede para tentar mais tarde e não chama a IA. Recarregar a página apaga a
conversa, mas não devolve consultas. Novo deploy também não zera a contagem.

## Por que não usar useState ou uma variável no servidor?

`useState` pertence a um navegador. Cada aluno teria sua própria contagem.
Uma variável da função some quando ela reinicia e não é compartilhada entre
instâncias. Por isso usamos um arquivo privado no Vercel Blob, acessível só pelo
servidor. Seu conteúdo tem exatamente data e quantidade, por exemplo:

```json
{"dia":"2026-11-13","quantidade":12}
```

Esse é um exemplo, não a contagem real. Perguntas, respostas, IP e aluno não entram
no arquivo. Há um único arquivo; a data antiga é substituída na primeira reserva
do dia seguinte. Não apagar nem renomear esse arquivo em produção: isso zeraria o teto.

## Cada bloco de server/limite-diario.js

1. `get`, `put` e `BlobPreconditionFailedError` vêm do SDK Blob, só no servidor.
2. `reservarConsulta` retorna `true` se reservou, `false` se acabou, ou lança erro
   se não consegue garantir a reserva. Os parâmetros padrão são os serviços reais;
   testes injetam funções simuladas. O navegador não escolhe esses parâmetros.
3. `AbortSignal.timeout(8000)` limita a espera total pelo armazenamento.
4. O laço tenta no máximo três vezes em caso de disputa entre requisições.
5. `Intl.DateTimeFormat` calcula a data em `America/Sao_Paulo`, independentemente
   do fuso do servidor. Datas no formato ano-mês-dia podem ser comparadas em ordem.
6. `get` com `useCache:false` lê a versão atual. `Response(...).json()` converte
   o fluxo de bytes em objeto JavaScript.
7. Valida data, quantidade inteira entre 0 e 50 e ETag. Estado inválido ou data
   futura gera erro, em vez de ser interpretado como zero.
8. Se a data é anterior, a nova contagem começa em zero. Se hoje já tem 50,
   retorna `false` sem gravar nem consultar OpenAI.
9. `put` salva a quantidade acrescida de um. Na criação, `allowOverwrite:false`
   impede substituir um arquivo criado simultaneamente por outra chamada.
10. Para um arquivo existente, `ifMatch` recebe o ETag lido. ETag é uma marca da
    versão do arquivo: a gravação só vale se ninguém alterou essa versão.
11. Se outra chamada gravou primeiro, o erro de precondição faz reler o arquivo.
    Qualquer outra falha bloqueia. Não há liberação alternativa em memória.

## Integração, configuração e testes

`api/perguntar.js` chama a reserva após validar entrada e chave, antes do Axios.
`false` vira HTTP 429; erro vira 503. O React já exibe `retorno.data.erro`, então
não precisa de um novo estado. O timeout do frontend é 60 segundos; o do Blob é
8 segundos e o da OpenAI, 45. A função Vercel tem duração máxima de 60 segundos.

Configurar `BLOB_READ_WRITE_TOKEN` no servidor, além da chave OpenAI. Nenhum deles
usa prefixo `VITE_`. No Hobby, Blob fica na franquia gratuita; se ela acabar, o
serviço para e o app bloqueia consultas. Não há contratação de plano pago.

`tests/limite-diario.test.js` verifica teto, disputa, fuso, corrupção e falhas sem
rede. `tests/api.test.js` prova que bloqueio não chama OpenAI.
`scripts/verificar-limite-real.mjs` usa o Blob real em um caminho aleatório isolado:
reserva 49 vagas, disputa a última, confere a 51ª bloqueada e remove o arquivo.
Não importa a API OpenAI nem modifica `quota/consultas.json`.

```powershell
vercel env run --environment development -- node scripts/verificar-limite-real.mjs
```

A execução usa variáveis do projeto no processo, sem criar `.env` local. Não rodar
o script repetidamente: cada teste consome operações da franquia do Blob.

Fonte: [SDK oficial Blob](https://vercel.com/docs/vercel-blob/using-blob-sdk).
