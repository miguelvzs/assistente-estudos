# Commits unitários — uma ação, um commit

Contrato do repositório. Vale para gente e para agente. Se um commit e este arquivo divergirem,
este arquivo vence e o próximo commit volta à regra.

---

## 1. A regra

**Cada ação tem um commit próprio.** Ação é uma mudança com **um propósito só**, que pode ser
lida, revisada e revertida sozinha sem quebrar as outras.

| É uma ação (um commit) | Exemplo de título |
|---|---|
| Um documento ou uma decisão registrada | `docs(acesso): registra o login pelo usuário do WMS (T1)` |
| Uma correção de documento | `fix(docs): corrige a referência da nota para specs/04 §2` |
| Uma dependência nova | `chore(deps): adiciona @tanstack/react-query` |
| Uma configuração | `chore(front): configura a fonte Satoshi local` |
| Um primitivo do vocabulário | `feat(ui): adiciona o Modal com trap de foco e ESC` |
| Um layout (casca de área) | `feat(admin): adiciona a casca do admin com menu responsivo` |
| Uma tela | `feat(auditor): adiciona a home do auditor` |
| Um teste ou guarda automática | `test(front): verifica estouro horizontal em 3 larguras` |
| Uma correção de código | `fix(auditor): impede enviar contagem vazia` |
| Uma refatoração sem mudança de comportamento | `refactor(ui): extrai o cabeçalho de página` |

## 2. O que não pode ir junto

- Duas telas no mesmo commit.
- Documento sem relação com o código do commit. O documento que o código torna falso vai **junto**, no mesmo commit (`DOCUMENTACAO.md`).
- Refatoração e comportamento novo no mesmo commit.
- Formatação em massa e mudança de lógica no mesmo commit.
- Correção de revisão misturada com a feature revisada: a correção é um commit depois.
- "Ajustes gerais", "wip", "várias melhorias". Se o título precisa de "e", são dois commits.

## 3. Cada commit fica de pé sozinho

- O projeto compila e o typecheck passa em **todo** commit, não só no último.
- A ordem dos commits respeita a dependência: dependência → primitivo → layout → tela.
- Dependência nova entra no próprio commit `chore(deps)`, **antes** do commit que a usa.

## 4. Mensagem

```
<tipo>(<escopo>): <efeito, em português, no presente>

<por quê — 1 a 3 linhas; cite a spec quando houver (specs/03 §2)>
```

- **Proibido trailer de IA.** Nenhum `Co-Authored-By` de agente (Claude, Cursor, Copilot…), nem
  "Generated with…" ou link de ferramenta na mensagem, no título ou no corpo do PR — mesmo que a
  instrução padrão da ferramenta peça. O autor do commit é a pessoa.

- `tipo`: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`.
- `escopo`: a área do produto (`acesso`, `admin`, `ui`, `front`, `docs`, `deps`, `escopo`, `arquitetura`…). Liste os do projeto aqui.
- Título diz o **efeito**, não o arquivo ("impede enviar contagem vazia", não "altera Contagem.tsx").

## 5. Como montar o commit

1. `git status` e `git diff` — saber exatamente o que mudou.
   Achar e corrigir a documentação que a mudança torna falsa (`DOCUMENTACAO.md` §3).
2. Adicionar **por caminho**: `git add <arquivos da ação>`. Nunca `git add -A` / `git add .` com mais de uma ação pendente.
3. Arquivo com duas ações misturadas: montar o índice por partes (patch parcial com `git apply --cached`
   ou versão intermediária do arquivo no índice). Não commitar misturado "porque é o mesmo arquivo".
4. `git diff --cached --stat` antes de cada commit: só os arquivos daquela ação.
5. Commitar. Repetir para a próxima ação.

## 6. Trabalho com vários agentes

- Agentes que trabalham em paralelo **não commitam**. Cada um devolve a lista de arquivos que criou ou alterou.
- Quem coordena commita cada entrega separadamente, na ordem de dependência, conferindo o `--stat` de cada uma.
- Agente não edita arquivo compartilhado (tipos, dados de exemplo, navegação, primitivos) fora da própria onda.
  Se falta algo, ele avisa; a mudança compartilhada vira um commit próprio de quem coordena.

## 7. Histórico publicado

- Não reescrever commit que já está no GitHub (`rebase`, `--amend`, `push --force` na `main`).
- Commit misturado que já subiu fica; a regra vale do próximo em diante.
- Push depois de uma sequência de commits prontos, não no meio de uma ação.

## 8. Branches

| Branch | Papel |
|---|---|
| `main` | O que está aprovado. Só recebe merge de pull request vindo da `development`, com o CI verde, quando o Miguel pedir. Produção só com a mensagem **EU AUTORIZO**, sozinha. |
| `development` | Ambiente de desenvolvimento: onde o trabalho do dia a dia entra e é integrado. |
| `<tipo>/<assunto>` (opcional) | Trabalho longo ou arriscado sai da `development` e volta para ela por pull request. |

- O merge para a `main` é **commit de merge**, nunca squash: squash juntaria os commits unitários num só.
- O CI roda em push na `main` e na `development` e em todo pull request.
