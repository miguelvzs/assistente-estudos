# Tecnologias, sites e créditos do IFAI

Tudo o que o projeto usa, com versão, função e origem. Versões conforme `package.json` em 13/11/2026.

## Aplicação

| Tecnologia | Versão | Função | Site |
|---|---|---|---|
| React + ReactDOM | 19.3.1 | Interface, estados (useState) e componentes | https://react.dev |
| Vite + @vitejs/plugin-react | 8.3.8 / 6.3.0 | Ambiente de desenvolvimento e build | https://vite.dev |
| Axios | 1.21.1 | Requisições HTTP no navegador e na função de servidor | https://axios-http.com |
| Tailwind CSS + @tailwindcss/vite | 4.3.5 | Estilo por classes no JSX | https://tailwindcss.com |
| Motion | 14.14.0 | Animações (entrada de mensagens, guia, botões) | https://motion.dev |
| Lucide React | 1.72.0 | Ícones | https://lucide.dev |
| Inter (@fontsource-variable/inter) | 5.3.0 | Fonte, servida pelo próprio site | https://rsms.me/inter · https://fontsource.org/fonts/inter |

## Servidor, dados e publicação

| Tecnologia | Função | Site |
|---|---|---|
| OpenAI Responses API (modelo gpt-6-luna) | Gera as respostas | https://developers.openai.com/api/reference/resources/responses/methods/create |
| Vercel Functions (Node.js) | Função `api/perguntar.js`, que guarda a chave | https://vercel.com/docs/functions/runtimes/node-js |
| Vercel Blob (@vercel/blob 2.4.0) | Contador privado de 50 consultas/dia | https://vercel.com/docs/vercel-blob |
| Vercel | Hospedagem; merge na `main` publica sozinho | https://vercel.com |
| Node.js ≥ 22.12 + node:test | 18 testes automáticos | https://nodejs.org/api/test.html |
| GitHub + GitHub Actions | Código e verificação (npm ci, testes, build) | https://github.com/miguelvzs/assistente-estudos |

## Componentes e recursos de terceiros

| Recurso | Autor / licença | Onde está no projeto | Link |
|---|---|---|---|
| 21st.dev | Biblioteca comunitária de componentes React | Fonte dos dois componentes abaixo | https://21st.dev |
| Chat Bubble (+ MessageLoading) | Jakob Hoeg Mørk, shadcn-chat, MIT | `src/components/ui/chat-bubble.jsx`, `message-loading.jsx` | https://21st.dev/@jakobhoeg/components/chat-bubble · https://github.com/jakobhoeg/shadcn-chat |
| AI Input With Loading (+ hook de altura) | Kokonut UI, MIT | `src/components/ui/ai-input-with-loading.jsx`, `src/hooks/use-auto-resize-textarea.js` | https://21st.dev/@kokonutd/components/ai-input-with-loading · https://kokonutui.com |
| Símbolo dos Institutos Federais | Setec/MEC, Manual da Marca 2015; domínio público no Wikimedia Commons | `src/components/MarcaIF.jsx`, `public/ifai.svg` | https://commons.wikimedia.org/wiki/File:Instituto_Federal_Marca_2015.svg |
| Paleta do IF | Verde #2f9e41 e vermelho #cd191e, do mesmo arquivo | `src/App.css` (@theme) | idem |

Detalhes da adaptação: [CREDITOS-UI.md](CREDITOS-UI.md). Licenças: pasta `licenses/`.

## Conteúdo das sugestões

Temas das 6 disciplinas do semestre, a partir do Moodle do IFSP Bragança: [CONTEUDOS-SEMESTRE.md](CONTEUDOS-SEMESTRE.md).

## Assistência de IA

Função de servidor, limite diário, adaptação dos componentes, marca IFAI, guia de apresentação e documentação foram feitos com pesquisa e assistência de IA. Não declarar autoria exclusiva.
