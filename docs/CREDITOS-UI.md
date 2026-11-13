# Créditos e adaptação da interface

Pedido de Miguel em 13/11/2026: aplicar componentes do 21st.dev, fonte Inter e animações com Motion. Os componentes ficam em `src/components/ui/`, separados do código do projeto.

## Chat Bubble — Jakob Hoeg Mørk

- Página: [Chat Bubble no 21st.dev](https://21st.dev/@jakobhoeg/components/chat-bubble).
- Código consultado: [shadcn-chat, chat-bubble.tsx](https://github.com/jakobhoeg/shadcn-chat/blob/47e5f8af020b6eacbd4cbd6ad5f6ff8d60e76aa8/packages/ui/src/components/ui/chat/chat-bubble.tsx) e [message-loading.tsx](https://github.com/jakobhoeg/shadcn-chat/blob/47e5f8af020b6eacbd4cbd6ad5f6ff8d60e76aa8/packages/ui/src/components/ui/chat/message-loading.tsx), commit 47e5f8a.
- Licença MIT: [licenses/shadcn-chat-MIT.txt](../licenses/shadcn-chat-MIT.txt).
- Arquivos: `chat-bubble.jsx` (ChatBubble, ChatBubbleAvatar, ChatBubbleMessage) e `message-loading.jsx`.
- Mantido: composição balão/avatar/mensagem, variantes `sent`/`received`, layout `ai`, `isLoading` com os três pontos animados (SVG copiado).
- Adaptado: TypeScript → JSX; `cva` → objetos de variantes; `cloneElement` → props explícitas; Avatar do Radix → `span`; cantos `rounded-2xl` com um canto menor; layout `ai` sem borda superior; cores do tema do projeto. Não usados: Timestamp e Actions.

## AI Input With Loading — Kokonut UI

- Página: [AI Input With Loading no 21st.dev](https://21st.dev/@kokonutd/components/ai-input-with-loading).
- O download direto no 21st.dev exige login. O código foi conferido em uma cópia pública instalada a partir do 21st.dev ([ingreBOARD, ai-input-with-loading.tsx](https://github.com/techynAR/ingreBOARD/blob/main/src/components/ui/ai-input-with-loading.tsx)) e no hook `use-auto-resize-textarea` do mesmo repositório. Conferir contra a página do 21st.dev quando possível.
- Licença MIT da Kokonut UI: [licenses/kokonut-ui-MIT.txt](../licenses/kokonut-ui-MIT.txt).
- Arquivos: `ai-input-with-loading.jsx` e `src/hooks/use-auto-resize-textarea.js`.
- Mantido: textarea `rounded-3xl` com fundo `bg-black/5`, crescimento automático entre 56 e 200px pelo hook, botão dentro do campo com ícone CornerRightUp, quadrado girando durante a espera, linha de status abaixo, Enter envia e Shift+Enter quebra linha.
- Adaptado: texto (`value`/`onChange`) e espera (`loading`) vêm do App, ligados à requisição real; removidos `loadingDuration`, `thinkingDuration` e `autoAnimate` (temporizadores de demonstração); botão `type="submit"` e Enter via `form.requestSubmit()`; botão alinhado à base e verde quando há texto; `whileTap` do Motion; textos em português.

## Símbolo do IF

- Arquivo: [Instituto Federal Marca 2015.svg](https://commons.wikimedia.org/wiki/File:Instituto_Federal_Marca_2015.svg), Wikimedia Commons, domínio público; elaborado a partir do Manual de Aplicação da Marca 2015 (Setec/MEC).
- Uso: `src/components/MarcaIF.jsx` (mesma geometria e cores) e `public/ifai.svg` (ícone da aba). “IFAI” é o nome do projeto acadêmico; não é serviço oficial do IF.

## Bibliotecas instaladas

| Pacote | Versão | Licença | Uso |
|---|---|---|---|
| tailwindcss, @tailwindcss/vite | 4.3.5 | MIT | Classes de estilo dos componentes |
| motion | 14.14.0 | MIT | Animações ([motion.dev](https://motion.dev)) |
| lucide-react | 1.72.0 | ISC | Ícones |
| @fontsource-variable/inter | 5.3.0 | OFL-1.1 (fonte) | Fonte Inter servida pelo site |

## Como falar na apresentação

“Usei componentes abertos do 21st.dev: o Chat Bubble, de Jakob Hoeg, e o AI Input With Loading, da Kokonut UI, ambos com licença MIT. Converti para JSX, troquei a simulação de carregamento pela requisição real e liguei ao estado do App. Estilo com Tailwind, animações com Motion, fonte Inter. Fiz isso com assistência de IA.”

Não afirmar autoria exclusiva nem que é cópia integral dos componentes.
