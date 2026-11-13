# Créditos e adaptação da interface

Componente de origem: [Chat Bubble — Jakob Hoeg Mørk no 21st.dev](https://21st.dev/@jakobhoeg/components/chat-bubble).
Código consultado: [shadcn-chat](https://github.com/jakobhoeg/shadcn-chat/blob/47e5f8af020b6eacbd4cbd6ad5f6ff8d60e76aa8/packages/ui/src/components/ui/chat/chat-bubble.tsx), commit 47e5f8af020b6eacbd4cbd6ad5f6ff8d60e76aa8.
Licença MIT preservada em [licenses/shadcn-chat-MIT.txt](../licenses/shadcn-chat-MIT.txt).

Adaptação simplificada, não instalação integral: composição de balão/avatar/conteúdo, variantes sent e received, alinhamento invertido e cantos distintos. ChatBubble.jsx usa funções e props comuns. As classes Tailwind foram traduzidas para CSS; removidos TypeScript, forwardRef, cloneElement, cva, Radix, ações e dependências visuais. Paleta, formulário, textos e layout geral foram ajustados para o projeto com assistência de IA.

Fala correta: “Adaptei o componente Chat Bubble de Jakob Hoeg, encontrado no 21st.dev, sob licença MIT. Simplifiquei para JSX e CSS e conectei ao estado e à requisição do projeto, com assistência de IA.”
Não afirmar autoria exclusiva nem que a adaptação elimina a necessidade de compreender o código.

## Campo de mensagem — Kokonut UI
Referência escolhida: https://21st.dev/@kokonutd/components/ai-input-with-loading
Código público consultado: https://github.com/kokonut-labs/kokonutui/blob/main/components/kokonutui/ai-input-search.tsx
Licença preservada em licenses/kokonut-ui-MIT.txt. O componente With Loading não foi instalado integralmente. Adaptamos o arranjo de textarea e barra inferior do compositor público, com CSS comum: crescimento via field-sizing, envio circular e indicador conectado à prop carregando. Sem Motion, Tailwind, TypeScript, menus, anexos ou novas dependências. Não afirmar que se trata de cópia integral do componente.
O layout atual das mensagens substitui o alinhamento invertido citado acima: ambos os autores à esquerda, com divisórias, conforme imagem escolhida por Miguel.
