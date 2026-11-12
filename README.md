# Assistente de Estudos

Chat de estudos em React, preparado para consumir a API OpenAI. Mantém as mensagens durante a sessão e envia as últimas três trocas como contexto. Trabalho individual AA04, Desenvolvimento Web Front End, IFSP Bragança Paulista. Autor: Miguel Vaz de Souza.

**Situação:** código publicado no [GitHub](https://github.com/miguelvzs/assistente-estudos), na branch `development`. Testes e compilação passaram no [GitHub Actions](https://github.com/miguelvzs/assistente-estudos/actions/runs/43287035516). Chave configurada no cofre e chamada real local à OpenAI confirmada (HTTP 200). Deploy Vercel ainda pendente. Simulação é apenas teste, não substitui consumo real da API na entrega.

## Comece aqui

- [Funcionamento do chat e histórico](docs/CHAT.md)

- [Explicação de todos os arquivos e do fluxo](docs/EXPLICACAO.md)
- [Roteiro falado de 15 minutos e perguntas da professora](docs/APRESENTACAO-15-MIN.md)
- [Mapa entre código e aulas](docs/MAPA-DAS-AULAS.md)
- [Testes e pendências](docs/VALIDACAO.md)
- [Publicação e checklist de entrega](docs/ENTREGA.md)

## Rodar sem chave, só para ensaiar

Pré-requisito: Node.js 22.12+ (testado localmente com 24.14.1), com npm.

```powershell
git clone https://github.com/miguelvzs/assistente-estudos.git
cd assistente-estudos
npm ci
npm run demo
```

Abra o endereço mostrado no terminal. O botão percorre React → POST local → resposta simulada. O texto identifica a simulação e não muda conforme a pergunta. Não chama a OpenAI e não tem custo de API.

## Rodar a integração

```powershell
npm run dev
```

O servidor precisa receber `OPENAI_API_KEY` pelo ambiente seguro. A chave do projeto está no cofre do OpenBot e deve ser injetada no ambiente do servidor. Nenhuma chave é distribuída com o projeto. Sem configuração, a tela abre e a consulta informa que a integração não foi configurada. O projeto não carrega automaticamente a chave de um arquivo `.env`.

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

O frontend envia `POST /api/perguntar` com `{ "pergunta": "...", "historico": [{ "role": "user", "content": "..." }, { "role": "assistant", "content": "..." }] }` (histórico vazio na primeira pergunta). A função retorna `{ "resposta": "..." }` ou `{ "erro": "..." }`.

O servidor chama [Responses API](https://developers.openai.com/api/reference/resources/responses/methods/create) em `POST https://api.openai.com/v1/responses`. Modelo técnico provisório: `gpt-6-luna`; confirmar acesso e funcionamento quando houver chave. Uma pergunta por chamada, até 2.000 caracteres. O histórico inclui até seis mensagens alternadas, equivalentes a três trocas. Toda a conversa fica visível, mas é apagada ao atualizar a página. O corpo JSON tem limite de 16.000 caracteres. A resposta é texto puro.

A professora autorizou OpenAI conforme informação de Miguel. A função Vercel é a exceção técnica aceita pelo usuário, não um conteúdo atribuído às aulas React. A OpenAI cobra por uso; esta aplicação não implementa controle global de gastos. Perguntas são enviadas ao provedor e não ficam salvas pelo app.

## Links da entrega

- GitHub: [https://github.com/miguelvzs/assistente-estudos](https://github.com/miguelvzs/assistente-estudos).
- Vercel: **pendente**.
- Prazo Moodle: **13/11/2026 às 23h59**. Apresentação: **até 15 minutos**.
- [Enunciado oficial](https://moodle.bra.ifsp.edu.br/mod/assign/view.php?id=21023).

Código e documentação preparados com assistência de IA a partir das aulas, para estudo e conferência pelo autor. Não afirmar que a simulação é uma resposta real da OpenAI.

## Custo do modelo
Modelo econômico: gpt-6-luna, reasoning.effort none e saída máxima de 600 tokens. Preços Standard consultados em 12/11/2026: US$ 0,10 por milhão de tokens de entrada e US$ 0,50 de saída. Exemplo hipotético: 1.000 chamadas com 1.000 tokens de entrada e 300 de saída cada custam US$ 0,25, sem impostos ou conversão cambial. O histórico também conta na entrada. Limite por resposta não limita o gasto acumulado. Fonte: https://developers.openai.com/api/docs/models/gpt-6-luna . Acesso e uma resposta real local foram confirmados com a chave do projeto; deploy ainda pendente.


## Público e finalidade
Apoio a alunos do IF em estudos gerais e técnicos: dúvidas, revisão, exercícios e organização dos estudos. Não se limita a React ou programação. O limite às aulas de React se refere à implementação do projeto, não aos temas das perguntas. Projeto acadêmico independente, sem acesso ao Moodle ou atendimento institucional.
