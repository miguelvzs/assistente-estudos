# Documentação no mesmo commit — o código não muda sozinho

Contrato de todo projeto Enviagora, irmão do `COMMITS.md`. Vai para `docs/DOCUMENTACAO.md` do repo,
com a tabela do §2 adaptada às páginas do projeto. Vale para gente e para agente.
Nasceu no Enviagora Hub (05/10/2026): com documento e código em commits separados, o manual ficou
para trás depois de um PR que mudou uma rota.

---

## 1. A regra

**O commit que muda o código leva junto a documentação que essa mudança torna falsa.**
Mudança, melhoria, novidade, remoção: se depois do commit algum `.md` descreve o código de um jeito
que já não é verdade, a correção desse `.md` entra **no mesmo commit**.

A documentação faz parte da ação (`COMMITS.md` §1). Em **todo** commit, os documentos descrevem o
código daquele commit. Reverter o commit desfaz o código e a documentação juntos.

## 2. O que mudou → onde atualizar

Adapte as páginas ao projeto. O ponto de partida:

| Mudou no código | Atualize |
|---|---|
| Rota, entidade, tabela, matriz de visibilidade | `ARCHITECTURE.md` e a referência de rotas e tabelas, se houver |
| Tela, fluxo, regra de negócio | A spec da feature em `docs/specs/` |
| Papel ou permissão | `ARCHITECTURE.md` (matriz) e o que descreve o acesso |
| Variável de ambiente, setup, script | `README.md` e o `.env.example` |
| Integração externa | `docs/EXPLICACAO.md` seção 6, `ARCHITECTURE.md` e `docs/VALIDACAO.md` |
| Infra, deploy, CI | `docs/ENTREGA.md` e `README.md` |
| Uma escolha com motivo | O registro de decisões; a que segue sem dono vai para o `ESCOPO.md` §7 como **aberta** |
| O que está ou não está no ar | `ESCOPO.md` |
| Algo que resolve uma pendência ou achado | O estado da linha em `PENDENCIAS.md` ou no arquivo de achados |
| Linha citada (`caminho:linha`) que mudou de lugar | A citação, onde estiver |

## 3. Como montar o commit

1. `git diff --stat`: o que o commit muda.
2. Ache onde isso está descrito, pelo nome do arquivo, da rota, da tela, da variável ou da regra:
   `git grep -n "<nome>" -- '*.md'`.
3. Corrija cada trecho que ficou falso. Dado gerado por script se regenera, não se edita à mão.
4. Se o projeto tem verificador de documentação (links, citações, dado gerado), ele termina sem
   problema. O verificador não pega texto que ficou falso: isso é o passo 2.
5. `git add` do código **e** dos `.md`, por caminho (`COMMITS.md` §5), e `git diff --cached --stat`.
6. No corpo do commit, quando a documentação mudou, diga o que mudou nela em uma linha.

## 4. O que esta regra não muda

- **Spec antes do código** (`2-METODOLOGIA.md` §4). Feature nova, ou decisão nova que muda regra,
  nasce como spec ou decisão aprovada, num commit `docs` próprio, **antes** do código. Esta regra
  cobre o outro lado: o reflexo do código na documentação.
- **Uma ação, um commit.** O `.md` entra porque descreve aquela ação. Documento sem relação com o
  código do commit vai num commit próprio.
- **Só documentação** (correção, texto novo, página nova, sem código) continua num commit `docs(...)`
  ou `fix(docs)` próprio.
- **Nada a descrever, nada a mudar.** Refatoração sem mudança de comportamento, teste ou estilo só
  mexem em documento se deslocarem uma citação `caminho:linha`.
- **Histórico publicado fica** (`COMMITS.md` §7). A regra vale do próximo commit em diante.

## 5. Agentes em paralelo

O agente entrega o código **com** os `.md` que ele torna falsos, na mesma lista de arquivos
(`COMMITS.md` §6). Quem coordena commita os dois juntos. Se o `.md` é de outra onda, o agente avisa.

## 6. Revisão e checagem

PR com commit que muda comportamento descrito e não traz o `.md` volta para ajuste; a correção entra
num commit novo. Se o projeto tem verificador de documentação, ele roda no CI de todo PR.

## Material de apresentação

Mudanças em arquivos, estados, chamadas ou limitações também atualizam EXPLICACAO.md, MAPA-DAS-AULAS.md e APRESENTACAO-15-MIN.md. Os documentos descrevem o código real, distinguindo simulação de integração validada.

