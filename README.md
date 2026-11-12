# Assistente de Estudos

Aplicação React que recebe uma pergunta e exibe uma explicação curta da OpenAI. Trabalho individual AA04, Desenvolvimento Web Front End, IFSP Bragança Paulista. Autor: Miguel Vaz de Souza.

**Situação:** implementação local; integração real e publicação pendentes da chave que Miguel fornecerá depois. Simulação é apenas teste, não substitui consumo real da API na entrega.

## Comece aqui

- [Explicação de todos os arquivos e do fluxo](docs/EXPLICACAO.md)
- [Roteiro falado de 15 minutos e perguntas da professora](docs/APRESENTACAO-15-MIN.md)
- [Mapa entre código e aulas](docs/MAPA-DAS-AULAS.md)
- [Testes e pendências](docs/VALIDACAO.md)
- [Publicação e checklist de entrega](docs/ENTREGA.md)

## Rodar sem chave, só para ensaiar

Pré-requisito: Node.js 22.12+ (testado localmente com 24.14.1), com npm.

```powershell
npm ci
npm run demo
```

Abra o endereço mostrado no terminal. O botão percorre React → POST local → resposta simulada. O texto identifica a simulação e não muda conforme a pergunta. Não chama a OpenAI e não tem custo de API.

## Rodar a integração

```powershell
npm run dev
```

O servidor precisa receber `OPENAI_API_KEY` pelo ambiente seguro. A chave será fornecida depois, pelo cofre do OpenBot. Nenhuma chave é distribuída com o projeto. Sem configuração, a tela abre e a consulta informa que a integração não foi configurada. O projeto não carrega automaticamente a chave de um arquivo `.env`.

Na Vercel, a chave será variável **somente do servidor**, nunca `VITE_OPENAI_API_KEY`. O arquivo `.env.example` lista o nome, sem valor real. Não inserir a chave no React, README, GitHub ou ZIP.

## Comandos

| Comando | Resultado |
|---|---|
| `npm run dev` | Vite com a função real; precisa da chave para consultar |
| `npm run demo` | Vite com resposta local simulada, sem chamar OpenAI |
| `npm run build` | Gera frontend otimizado em dist |
| `npm run preview` | Serve somente o frontend compilado; NÃO executa a função da API |
| `npm test` | Testes da função com provedor simulado, sem rede/chave real |

## Bibliotecas instaladas

| Biblioteca | Versão | Uso |
|---|---|---|
| react | 19.3.1 | Componentes e estados |
| react-dom | 19.3.1 | Coloca o React no HTML |
| axios | 1.21.1 | Requisições HTTP no frontend e no servidor |
| vite | 8.3.8 | Desenvolvimento e build |
| @vitejs/plugin-react | 6.3.0 | Integra React ao Vite |

Testes usam recursos nativos do Node; nenhuma biblioteca extra de testes. Não há SDK da OpenAI, banco, roteador, biblioteca de UI ou sistema de login.

## API e limites

O frontend envia `POST /api/perguntar` com `{ "pergunta": "..." }`. A função retorna `{ "resposta": "..." }` ou `{ "erro": "..." }`.

O servidor chama [Responses API](https://developers.openai.com/api/reference/resources/responses/methods/create) em `POST https://api.openai.com/v1/responses`. Modelo técnico provisório: `gpt-5-mini`; confirmar acesso e funcionamento quando houver chave. Uma pergunta por chamada, até 2000 caracteres, sem memória de conversa. A resposta é texto puro.

A professora autorizou OpenAI conforme informação de Miguel. A função Vercel é a exceção técnica aceita pelo usuário, não um conteúdo atribuído às aulas React. A OpenAI cobra por uso; esta aplicação não implementa controle global de gastos. Perguntas são enviadas ao provedor e não ficam salvas pelo app.

## Links da entrega

- GitHub: **pendente**.
- Vercel: **pendente**.
- Prazo Moodle: **13/11/2026 às 23h59**. Apresentação: **até 15 minutos**.
- [Enunciado oficial](https://moodle.bra.ifsp.edu.br/mod/assign/view.php?id=21023).

Código e documentação preparados com assistência de IA a partir das aulas, para estudo e conferência pelo autor. Não afirmar que a simulação é uma resposta real da OpenAI.
