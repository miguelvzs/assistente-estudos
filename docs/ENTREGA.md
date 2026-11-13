# Entrega da versão OpenAI

## Links e branches
- [GitHub](https://github.com/miguelvzs/assistente-estudos).
- [Produção Vercel](https://assistente-estudos-three.vercel.app): estado em VALIDACAO.md.
- main: versão aprovada, publicada automaticamente pela integração Git da Vercel.
- development: alterações e verificações antes do PR.
- versao-suap: alternativa independente, não misturar com o ZIP OpenAI.

## Fluxo de publicação
1. Atualizar código e documentação no mesmo commit quando houver mudança de comportamento.
2. Rodar npm test e npm run build; registrar evidências.
3. Enviar development e abrir PR para main. Conferir CI no commit atual.
4. Fazer merge com commit de merge; nunca squash ou reescrita do histórico.
5. A Vercel detecta a mudança na main e publica. Conferir READY e o SHA publicado.
6. Conferir página, erro de entrada e uma resposta real sem login Vercel.

OPENAI_API_KEY é exclusiva de produção. BLOB_READ_WRITE_TOKEN pertence ao contador
privado. Ambas só no servidor, sem prefixo VITE_. Sem contador disponível, a
consulta é bloqueada. Preview não tem chave OpenAI e não simula respostas reais.
Não colocar segredo no README, código, ZIP, captura ou logs.

## ZIP
Usar git archive do commit aprovado. Incluir src, api, server, testes, scripts,
configurações, package.json, lockfile, imagem e documentos. Excluir node_modules,
dist, .git, .vercel, arquivos .env com valores e logs. .env.example pode entrar,
com campos vazios. Conferir lista do ZIP e comparar seu commit com o publicado.

## Moodle
Miguel pediu preparar ZIP e links e depois adiou a submissão em 13/11/2026. Não enviar nesta etapa. Quando solicitar a submissão, usar a tarefa
[AA04](https://moodle.bra.ifsp.edu.br/mod/assign/view.php?id=21023).
Não substituir arquivos anteriores sem necessidade. Não declarar autoria exclusiva
nem aceitar declaração incompatível com o uso documentado de assistência de IA.
Se houver confirmação final separada, verificar seu texto antes de prosseguir.
Após salvar, reler a tarefa e confirmar links, nome do ZIP e situação da entrega.

## Apresentação
APRESENTACAO-15-MIN.md contém o roteiro. EXPLICACAO.md explica os arquivos e o fluxo;
CHAT.md explica arrays; LIMITE-DIARIO.md explica a infraestrutura adicional;
MAPA-DAS-AULAS.md distingue o que veio das aulas. INVENTARIO.md conta o código atual.
O aluno deve ensaiar e saber explicar, não apenas ler os textos.

Prazo informado no Moodle: 13/11/2026 às 23h59; apresentação de até 15 minutos.
Estado efetivamente conferido da entrega em VALIDACAO.md.
