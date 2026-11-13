# Chat convencional com base externa

Pedido de Miguel em 13/11/2026 após a submissão: melhorar UI/UX usando componente encontrado no 21st.dev, com crédito explícito.
Base escolhida: Chat Bubble de Jakob Hoeg Mørk, licença MIT; adaptar a composição sent/received, avatar e mensagem para JSX/CSS simples, sem instalar Tailwind, Radix ou TypeScript.
Interface: conversa rolável, campo na base, balões com autoria, envio por Enter e quebra por Shift+Enter, mensagem pendente visível e indicador de espera. Erros preservam o texto para nova tentativa. Resposta inteira, sem streaming.
A rolagem ao inserir mensagem usa callback ref e scrollIntoView: técnica adicional de DOM, documentada. Nenhum hook novo.
Servidor, limite de 50/dia e histórico de 3 trocas permanecem. Branch isolada; não substituir main nem envio Moodle nesta etapa.
Critérios: vazio/sucesso/espera/erro; teclado; texto longo; desktop/celular; sem nova dependência ou segredo no frontend.
Aberto: aprovação visual e eventual publicação/substituição da entrega.

## Referência visual escolhida
Miguel escolheu a imagem Chat Bubble AI Layout: ambas as falas alinhadas à esquerda, avatar circular e separadores discretos, sem fundo de balão. Manter a paleta clara atual. Não acrescentar botões de copiar/regenerar sem implementar suas ações. Campo de digitação permanece nesta alteração; escolha de componente de entrada é independente.

## Campo de digitação
Aplicar referência AI Input With Loading da Kokonut: caixa arredondada, textarea expansível e envio circular integrado. O código público atual consultado é AI Input Search; adaptação mínima do compositor, sem ferramentas, upload ou seleção de modelo. Crescimento via CSS field-sizing: content, com fallback redimensionável; espera usa carregando real. Nenhuma dependência nova.
