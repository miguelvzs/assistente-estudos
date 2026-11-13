# Publicação da versão OpenAI

Se algo aqui conflitar com o código atual, este arquivo vence e o código muda.

## Pedido e decisões

Miguel autorizou a publicação condicionada a 50 requisições por dia e pediu,
em 13/11/2026, `main` com deploy automático após merge, documentação completa
e ZIP/link no Moodle. A versão SUAP será outra branch, sem substituir este chat.

## Limite diário

- Máximo de 50 tentativas de consulta à OpenAI, somadas entre todos os alunos.
- Dia civil em `America/Sao_Paulo`; renovação à meia-noite desse fuso.
- Validar entrada e chave antes de reservar uma consulta.
- Reservar antes de chamar OpenAI. Erro do provedor também consome a reserva:
  não há devolução nem repetição automática de chamadas cobradas.
- O contador sobrevive a deploys, reinícios e múltiplas funções simultâneas.
- Contador privado no Vercel Blob: apenas data e quantidade, sem perguntas,
  respostas, identificadores de aluno ou IP. Arquivo único, substituído a cada dia.
- Leitura sem cache e gravação condicionada à versão (`ETag`), para impedir
  que chamadas simultâneas recebam a mesma última vaga.
- Falha do armazenamento, estado inválido ou disputa não resolvida bloqueia
  a consulta (503). Não existe fallback em memória nem opção para desligar o limite.
- A 51ª tentativa recebe 429: “O limite de 50 consultas de hoje foi atingido.
  Tente novamente amanhã (horário de Brasília).”
- Preview não recebe a chave OpenAI de produção. Não criar modo simulado na
  função publicada; o modo demo continua exclusivo do desenvolvimento local.

## Infraestrutura

Vercel Hobby e Blob privado, dentro da franquia gratuita, sem plano pago.
O Blob é infraestrutura adicional à aula; não é um banco de conversas. O plano
Hobby bloqueia o serviço ao ultrapassar sua franquia. Nesse caso, o app também
bloqueia consultas, preservando o teto. Não fazer upgrade automaticamente.

## Versionamento e entrega

`development` integra mudanças. `main` recebe PR com CI aprovado e commit de
merge, preservando os commits unitários. A integração Git da Vercel usa `main`
como Production Branch. O ZIP vem do commit publicado, sem dependências,
segredos, `.git` ou `.vercel`. O material SUAP permanece em `versao-suap`.

## Critérios de verificação

Testar 50 reservas e bloqueio da 51ª; concorrência na última vaga; mudança de
dia no fuso de Brasília; estado corrompido; armazenamento indisponível;
ausência de credenciais; nenhuma chamada OpenAI após bloqueio. Os testes
automatizados usam armazenamento e provedor simulados, sem custo de OpenAI.
Antes de liberar a chave em produção, verificar o Blob real com reservas de
teste em arquivo isolado. Conferir site e função na Vercel após o merge.

Fontes técnicas: [SDK Blob](https://vercel.com/docs/vercel-blob/using-blob-sdk)
e [franquia Hobby](https://vercel.com/docs/vercel-blob/usage-and-pricing),
consultadas em 13/11/2026.
