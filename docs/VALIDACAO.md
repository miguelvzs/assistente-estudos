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
  Publicação final ainda em verificação.

## Evidências anteriores
Interface conferida em desktop e celular em 12/11. Conversa, mascote, campo e
rodapé sem sobreposição observada. Fluxo real local mostrou resposta, limpou o
campo e confirmou conexão. As portas locais daquela sessão não são links de entrega.

## Pendente nesta etapa
- Publicação final da main e consulta real pela URL Vercel.
- Verificação visual publicada e acesso sem login Vercel.
- ZIP final e anexos/links salvos no Moodle.
- Ensaio de Miguel com cronômetro: documentação não comprova domínio oral.
- Integração SUAP, pertencente a outra branch.

Saldo e consumo acumulado OpenAI não auditados. Testes não garantem disponibilidade
futura. O limite controla este aplicativo, não outros usos da mesma credencial.
