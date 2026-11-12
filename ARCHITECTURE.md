# Arquitetura

Fluxo aprovado: formulário React → POST /api/perguntar com pergunta e histórico (Axios) → função Vercel → POST https://api.openai.com/v1/responses → JSON {resposta} → useState → tela.

Frontend não recebe chave, modelo nem objetos internos da OpenAI. Mesmo domínio para tela e API. Sem CORS aberto. Backend valida método, JSON, histórico alternado de até seis mensagens e pergunta (1–2000 caracteres), usa chave de ambiente, limita saída, controla tempo e converte erros para mensagens sem detalhes secretos.

Implementação técnica proposta para o modelo: gpt-6-luna, reasoning none, até 600 tokens de saída, store:false. Cada requisição carrega explicitamente as últimas três trocas, sem previous_response_id. Confirmar com teste real depois.

Na Vercel, api/perguntar.js usa Request/Response nativos do Node. No desenvolvimento, vite.config.js conecta a mesma função ao servidor Vite. Modo demonstracao substitui apenas a integração no ambiente local por resposta fixa identificada. Nenhum mock é selecionável por parâmetro na função publicada.
