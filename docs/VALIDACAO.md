# Validação OpenAI — 13/11/2026

## Confirmado
- Chamada real local OpenAI em 12/11/2026, com gpt-6-luna, HTTP 200 e resposta
  no chat. Registro histórico; não nova chamada nesta revisão.
- npm test: 18 testes aprovados, sem rede nem chave real.
- npm run build: frontend compilado.
- npm audit --omit=dev: nenhuma vulnerabilidade reportada nesta revisão.
- Limite diário: 50 reservas, 51ª bloqueada, concorrência na última vaga,
  virada do dia em Brasília, estado inválido e armazenamento indisponível.
- Blob real: script isolado reservou 49 vagas, disputou a última entre três
  chamadas, confirmou total 50 e bloqueio da seguinte. Arquivo de teste removido.
  Nenhuma chamada OpenAI; contador do app não alterado.
- main criada; Vercel vinculada ao repositório com Production Branch main.
  Deploy automático após o merge do PR #1 confirmado READY no commit a01c3c5.

## Evidências anteriores
Interface conferida em desktop e celular em 12/11. Conversa, mascote, campo e
rodapé sem sobreposição observada. Fluxo real local mostrou resposta, limpou o
campo e confirmou conexão. As portas locais daquela sessão não são links de entrega.

## Pendente nesta etapa
- Submissão no Moodle adiada por Miguel; nada enviado.

- ZIP final será gerado do commit aprovado, com verificação do conteúdo.
- Ensaio de Miguel com cronômetro: documentação não comprova domínio oral.
- Integração SUAP, pertencente a outra branch.

Saldo e consumo acumulado OpenAI não auditados. Testes não garantem disponibilidade
futura. O limite controla este aplicativo, não outros usos da mesma credencial.

## Produção confirmada em 13/11/2026
[URL pública](https://assistente-estudos-three.vercel.app) respondeu HTTP 200
sem login Vercel. Pergunta vazia retornou 400. Duas consultas reais sobre frações
retornaram 200: uma pela rota e outra pelo formulário. Campo limpo e aviso de
conexão confirmado após a resposta. Essas consultas consomem duas vagas do dia.
Interface conferida com resposta em desktop (1905px) e celular (375px), sem
sobreposição observada. Nenhum diagnóstico de erro no navegador nessa verificação.
A proteção da main exige PR e verificação `verificar` aprovada antes de merge.

## Prévia chat 21st — branch separada
Build e 18 testes de servidor aprovados. Navegador local: sucesso simulado com Enter, pergunta vazia recusada, Shift+Enter insere quebra sem enviar, duas mensagens por troca. Desktop 1159×693 e mobile 375×844 conferidos visualmente; nenhum estouro horizontal observado no desktop. API real não foi chamada nesta revisão visual. O modo demonstracao permanece identificado. Produção e ZIP submetido não foram substituídos.

Campo Kokonut adaptado: build aprovado e 18 testes de servidor/quota passaram. Prévia mobile 375px: texto com três linhas expande textarea a 86px, sem estouro horizontal; Enter envia, resposta simulada aparece e campo limpa. Screenshot conferido. A espera por texto automático expirou por diferença de maiúsculas, mas snapshot confirmou a resposta. Sem chamada real à OpenAI nesta revisão.

Chat de IA com componentes 21st.dev, Tailwind, Motion e Inter (13/11, noite): build aprovado e 18 testes passaram. Prévia de demonstração conferida em 1159px e 375px: tela inicial, sugestão enviada, três pontos de espera, resposta animada, campo cresce de 56 para 104px com texto longo e volta a 56px no envio, Nova conversa limpa, Enter vazio mostra alerta, sem rolagem horizontal. Fonte Inter carregada (document.fonts.check). Sem chamada real à OpenAI nesta revisão.

IFAI (13/11, noite): marca com símbolo oficial do IF, paleta IF, guia de apresentação e sugestões por matéria. Conferido em 1159px e 375px: guia abre, troca de aba, fecha com Esc, 23 links; filtros e cartões de sugestão; sem rolagem horizontal.

Contexto por matéria, logo na grade e anti-slop (13/11, noite): 19 testes e build aprovados. Prévia em 1159px e 375px: filtro e seletor sincronizados, temas exibidos, sem rolagem horizontal, guia sem aba Roteiro, nenhum travessão no texto da página.
