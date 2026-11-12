> Atualização aprovada: chat com histórico transitório em useState substitui a consulta isolada e a antiga exclusão de histórico. Consulte docs/CHAT.md (ou CHAT.md nesta pasta) e docs/specs/02-chat.md. Sem persistência; últimas 3 trocas enviadas à API. As descrições anteriores de resposta única são históricas.

# Arquitetura

Fluxo aprovado: formulário React → POST /api/perguntar (Axios) → função Vercel → POST https://api.openai.com/v1/responses → JSON {resposta} → useState → tela.

Frontend não recebe chave, modelo nem objetos internos da OpenAI. Mesmo domínio para tela e API. Sem CORS aberto. Backend valida método, JSON e pergunta (1–2000 caracteres), usa chave de ambiente, limita saída, controla tempo e converte erros para mensagens sem detalhes secretos.

Implementação técnica proposta para o modelo: gpt-5-mini, reasoning minimal, até 1200 tokens de saída, store:false. Requisição independente, sem previous_response_id. Confirmar com teste real depois.

Na Vercel, api/perguntar.js usa Request/Response nativos do Node. No desenvolvimento, vite.config.js conecta a mesma função ao servidor Vite. Modo demonstracao substitui apenas a integração no ambiente local por resposta fixa identificada. Nenhum mock é selecionável por parâmetro na função publicada.

