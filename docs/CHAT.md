
## Chat: atualização que substitui o fluxo de pergunta isolada
Agora a tela mostra uma lista de mensagens. O estado `resposta` foi substituído por `mensagens`, inicialmente `[]`. Cada objeto contém `role` (user/assistant) e `content` (texto). Os demais estados continuam pergunta, carregando e erro.

O App envia `{ pergunta, historico: mensagens.slice(-6) }`: slice cria uma cópia das últimas seis mensagens, equivalentes a três trocas. Depois do sucesso, `[...mensagens, pergunta, resposta]` representa a criação de uma nova lista (no código, pergunta e resposta são objetos). O spread copia a lista sem alterar diretamente o estado. A pergunta digitada é limpa só no sucesso. Em erro, o campo permanece preenchido para tentar de novo; a conversa anterior permanece intacta.

Resposta.jsx recebe a lista por props e usa map para transformar cada objeto em um bloco visual. key identifica cada item para o React. Aqui o índice serve porque só acrescentamos ao final, sem ordenar ou excluir itens. role define o rótulo Você/Assistente e a classe CSS. O conteúdo aparece como texto, sem interpretar HTML. FormularioPergunta continua controlado por value e onChange, com onSubmit e preventDefault.

A função de servidor valida histórico de no máximo seis mensagens alternadas user/assistant, com texto não vazio. Ignora propriedades extras, acrescenta a pergunta atual e manda a lista no campo input da OpenAI. Nenhum papel system/developer vindo do navegador é aceito. Limite de corpo continua 16.000 caracteres: conversas excepcionalmente grandes podem receber erro e exigir recomeçar. Não é controle global de gastos.

Toda a conversa fica visível, mas só as últimas três trocas são reenviadas como contexto. Isso aumenta o consumo em comparação com pergunta isolada. Atualizar a página zera o estado; não há armazenamento local nem banco. O modo demo continua resposta fixa explicitamente simulada e não comprova memória real da IA.

Aulas: 04 props; 06 map/key e condicionais; 07 eventos/formulário; 08 useState/listas de estado; 09 Axios/Promises. slice e spread são operações JavaScript de arrays explicadas acima; não são novos hooks ou bibliotecas. A função de servidor segue a exceção documentada.
