# Interface de chat — branch feat/chat-ui-21st

Chat de IA convencional em tela cheia (13/11/2026, pedido de Miguel). Nome IFAI: símbolo oficial do IF + “IF” verde e “AI” vermelho, montado na grade do Manual da Marca (módulo x = lado do quadrado; nome com 2,2x de altura nas duas primeiras linhas; “Assistente de estudos” e “IFSP Bragança Paulista” em Regular com 75% de x, apoiados na 3ª e na 4ª linha; 1x entre símbolo e texto). Cabeçalho usa a versão compacta. Fonte Open Sans, oficial da marca do IF. Paleta do IF: verde #2f9e41 e vermelho #cd191e; balões e botões em #1f7a33 (contraste com texto branco). Tailwind CSS v4, Motion e ícones Lucide.

- Cabeçalho fixo: marca IFAI compacta, selo de status (telas largas), “Nova conversa” quando há mensagens e botão “Apresentação”, que abre o guia lateral.
- Conversa: única área com rolagem; coluna máxima de 768px. Pergunta em balão verde à direita (Chat Bubble `sent`); resposta com avatar e texto em largura total (Chat Bubble layout `ai`). Espera com três pontos animados.
- Tela inicial: marca IFAI grande, “Vamos estudar?”, filtros por matéria do semestre e cartões de perguntas (seis no computador, três no celular) e, com matéria escolhida, a lista de temas, aviso de memória e autoria.
- Chips dentro da caixa de digitação, à esquerda do envio: matéria (ligada aos filtros da tela inicial) e esforço de raciocínio (baixo, médio, alto).
- Campo: AI Input With Loading (Kokonut): pílula cinza que cresce até 200px, botão interno verde quando há texto, quadrado girando durante a espera, status abaixo e aviso de que a IA pode errar.
- Animações curtas (até 0,3s): entrada das mensagens, troca da tela inicial, toque no botão. Desligadas quando o sistema pede menos movimento.
- Responsivo a partir de 375px, sem rolagem horizontal; área segura do iPhone respeitada; texto do campo em 16px.
- Acessibilidade: rótulo do campo, `role="log"`, `role="alert"`, `role="status"`, foco visível, `aria-label` nos botões de ícone.

Sem mascote, menus, anexos, seleção de modelo, copiar/regenerar ou streaming. Créditos: docs/CREDITOS-UI.md.

Revisão anti-slop (skill design-taste-frontend, 13/11/2026): sem travessões na interface, no máximo um ponto médio por linha (hoje nenhum), rodapés reescritos em frases, aba Roteiro removida do guia.
