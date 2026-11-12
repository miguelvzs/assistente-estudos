# Spec 01 — Perguntar

- Campo: **Sua pergunta**, até 2000 caracteres. Exemplo no placeholder, não preenchido automaticamente.
- Botão: **Perguntar**, passa para **Consultando...** enquanto espera. Campo e botão desabilitados durante consulta.
- Entrada vazia: **Digite uma pergunta antes de enviar.** Sem chamada à API.
- Resposta inicial: **A resposta à sua pergunta aparecerá aqui.**
- Nova consulta apaga resposta/erro anterior. Não existe conversa contínua.
- Sucesso: texto da API, com quebras de linha; nunca inserir HTML bruto.
- Erro: mensagem do servidor ou mensagem local de conexão; liberar nova tentativa.
- Aviso: **Resposta gerada por IA. Confira com o material da disciplina.**
- Somente o botão/formulário dispara consulta; nada é enviado ao abrir ou digitar.
- Modo local demonstracao retorna texto explicitamente simulado; não se apresentar como integração real.
- Verificar: vazio, sucesso, falha, nova tentativa, limite, resposta inválida, chave ausente e método incorreto.
