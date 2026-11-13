# Arquitetura

Fluxo aprovado: formulário React → POST /api/perguntar com pergunta e histórico (Axios) → função Vercel → reserva no contador Blob privado → POST https://api.openai.com/v1/responses → JSON {resposta} → useState → tela.

`server/limite-diario.js` lê `quota/consultas.json` sem cache e grava data/quantidade com ETag. São até 50 reservas por dia de Brasília, compartilhadas por todos os deploys que usam o mesmo armazenamento. Não há gravação de conversas. Falha no contador impede a chamada OpenAI. Explicação em docs/LIMITE-DIARIO.md.

Frontend não recebe chave, modelo nem objetos internos da OpenAI. Mesmo domínio para tela e API. Sem CORS aberto. Backend valida método, JSON, histórico alternado de até seis mensagens e pergunta (1–2000 caracteres), usa chave de ambiente, limita saída, controla tempo e converte erros para mensagens sem detalhes secretos.

Configuração do modelo: gpt-6-luna, reasoning none, até 600 tokens de saída, store:false. Cada requisição carrega explicitamente as últimas três trocas, sem previous_response_id. Chamada real local confirmada em 12/11/2026; evidências atuais em docs/VALIDACAO.md.

Na Vercel, api/perguntar.js usa Request/Response nativos do Node. No desenvolvimento, vite.config.js conecta a mesma função ao servidor Vite. Modo demonstracao substitui apenas a integração no ambiente local por resposta fixa identificada. Nenhum mock é selecionável por parâmetro na função publicada.
