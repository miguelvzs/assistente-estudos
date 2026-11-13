# Assistente de Estudos

Chat de estudos em React que consome a API OpenAI. Mantém as mensagens durante a sessão e envia as últimas três trocas como contexto. Trabalho individual AA04, Desenvolvimento Web Front End, IFSP Bragança Paulista. Autor: Miguel Vaz de Souza.

**Situação:** código publicado no [GitHub](https://github.com/miguelvzs/assistente-estudos), com `main` para produção e `development` para manutenção. Testes e compilação passaram no [GitHub Actions](https://github.com/miguelvzs/assistente-estudos/actions/runs/43287035516). Chave configurada no cofre e chamada real local à OpenAI confirmada (HTTP 200). Limite diário validado em testes e no Blob real. Projeto Vercel vinculado à `main`; publicação final em verificação. Consulte docs/VALIDACAO.md para o estado atualizado. Simulação é apenas teste, não substitui consumo real da API na entrega.

## Versões

Esta branch contém o chat OpenAI. A alternativa SUAP fica separada em `versao-suap`; acesso real à API do IFSP ainda não confirmado. Veja [a organização das versões](docs/VERSOES.md).

## Comece aqui

- [Funcionamento do chat e histórico](docs/CHAT.md)

- [Explicação de todos os arquivos e do fluxo](docs/EXPLICACAO.md)
- [Roteiro falado de 15 minutos e perguntas da professora](docs/APRESENTACAO-15-MIN.md)
- [Mapa entre código e aulas](docs/MAPA-DAS-AULAS.md)
- [Testes e pendências](docs/VALIDACAO.md)
- [Limite diário explicado](docs/LIMITE-DIARIO.md)
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

Testes usam recursos nativos do Node. Não há SDK da OpenAI, banco de conversas, roteador, biblioteca de UI ou login. `@vercel/blob` 2.4.0 é usado somente no servidor para o contador privado de 50 consultas por dia.

## API e limites

O frontend envia `POST /api/perguntar` com `{ "pergunta": "...", "historico": [{ "role": "user", "content": "..." }, { "role": "assistant", "content": "..." }] }` (histórico vazio na primeira pergunta). A função retorna `{ "resposta": "..." }` ou `{ "erro": "..." }`.

O servidor chama [Responses API](https://developers.openai.com/api/reference/resources/responses/methods/create) em `POST https://api.openai.com/v1/responses`. Modelo configurado: `gpt-6-luna`, com chamada real local validada em 12/11/2026. Uma pergunta por chamada, até 2.000 caracteres. O histórico inclui até seis mensagens alternadas, equivalentes a três trocas. Toda a conversa fica visível, mas é apagada ao atualizar a página. O corpo JSON tem limite de 16.000 caracteres. A resposta é texto puro.

A professora autorizou OpenAI conforme informação de Miguel. Servidor e contador diário são infraestrutura adicional, feita com pesquisa e assistência de IA, não conteúdo atribuído às aulas React. A aplicação permite 50 tentativas por dia no total, renovadas à meia-noite de Brasília. Falhas do provedor também contam. Perguntas e respostas não são gravadas pelo app.

Além de `OPENAI_API_KEY`, configurar `BLOB_READ_WRITE_TOKEN` somente no servidor. Sem contador disponível, a consulta é bloqueada. O Blob privado guarda apenas data e quantidade; sobrevive a reinícios e deploys. Preview não recebe a chave OpenAI de produção. Consulte [o guia do limite](docs/LIMITE-DIARIO.md).

## Links da entrega

- GitHub: [https://github.com/miguelvzs/assistente-estudos](https://github.com/miguelvzs/assistente-estudos).
- Vercel: [Assistente de Estudos](https://assistente-estudos-three.vercel.app). Estado de validação em docs/VALIDACAO.md.
- Prazo Moodle: **13/11/2026 às 23h59**. Apresentação: **até 15 minutos**.
- [Enunciado oficial](https://moodle.bra.ifsp.edu.br/mod/assign/view.php?id=21023).

Código e documentação preparados com assistência de IA a partir das aulas, para estudo e conferência pelo autor. Não afirmar que a simulação é uma resposta real da OpenAI.

## Custo do modelo
Modelo: `gpt-6-luna`, `reasoning.effort: none`, máximo de 600 tokens de saída e orientação de até 180 palavras. O histórico também conta na entrada. Consulte os [preços oficiais](https://developers.openai.com/api/docs/models/gpt-6-luna) antes de estimar custo; não há preço fixo por pergunta. O teto de 50 tentativas/dia vale para este aplicativo, não para toda a conta OpenAI.


## Público e finalidade
Apoio a alunos do IF em estudos gerais e técnicos: dúvidas, revisão, exercícios e organização dos estudos. Não se limita a React ou programação. O limite às aulas de React se refere à implementação do projeto, não aos temas das perguntas. Projeto acadêmico independente, sem acesso ao Moodle ou atendimento institucional.
