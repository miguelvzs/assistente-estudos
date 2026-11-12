# Consulta da API no chat

O formulário recebe texto de até 2.000 caracteres e envia pergunta e histórico por Axios POST. Texto vazio exibe erro. Durante a espera, campo e botão ficam desabilitados; a conversa anterior permanece visível.

No sucesso, o App acrescenta pergunta e resposta à lista e limpa o campo. Em erro, mantém a lista e o texto digitado, permitindo tentar novamente sem duplicar mensagens. A primeira tela orienta a digitar uma pergunta. O histórico é transitório: atualizar a página apaga tudo.

Detalhes do contexto em 02-chat.md e organização visual em 03-organizacao-chat.md. A chave existe apenas no servidor. Modo demo local é fixo e identificado; não é prova de integração real. Validar vazio, sucesso, falha, nova tentativa, limites, histórico inválido, chave ausente e método incorreto.
