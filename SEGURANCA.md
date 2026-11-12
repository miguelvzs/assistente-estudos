# Segurança — playbook para novos projetos

Cole este arquivo na **raiz** do repositório novo. No `AGENTS.md` (ou equivalente),
aponte para ele na ordem de leitura e trate as regras daqui como **duras**.

Não é um checklist de compliance genérico. É o que evita o painel vazando, o
login travando o único admin e o front carregando segredo no bundle.

---

## 0. Como usar

1. Classifique o dado (§1) **antes** de desenhar tela ou rota.
2. Copie os bloqueios (§2) para o spec de acesso do produto.
3. Implemente o mínimo de autenticação (§3–§5) **antes** do primeiro dado real.
4. Não acrescente MFA, OAuth, “esqueci a senha” ou webhook sem decisão
   registrada e caminho de recuperação.
5. O spec vence o código. Se o spec e o código divergirem, pare e pergunte.

Trecho para colar no `AGENTS.md`:

```
Leia SEGURANCA.md antes de escrever rota, cookie, proxy, export ou login.
Nenhum segredo no front. Nenhuma rota de dado sem sessão. CORS sem `*`.
Não invente MFA, KPI nem coluna. Dado que falta é `null`, nunca `0`.
```

---

## 1. Classifique o dado primeiro

| Nível | Exemplos | Consequência |
|---|---|---|
| **Interno** | Agregado sem pessoa, sem preço unitário | Login nominal ainda é obrigatório se o produto for confidencial como um todo |
| **Confidencial** | Custo, condição negociada, e-mail de colaborador | Sem link público, sem preview com dado real, sem CSV que circule solto |
| **Restrito** | Token, `DATABASE_URL`, tabela de preço + fornecedor | Só variável de ambiente / cofre. Nunca no repo, log, task ou print |

Na dúvida, o nível **mais alto** vence. Tratar Interno como Confidencial é
atrito. O inverso é vazamento.

Produto Confidencial **não é público em nenhum ambiente**, inclusive
“versão de demonstração” e preview de PR.

---

## 2. Bloqueios duros

Nenhum destes cai por urgência, “é só para mim” ou pedido no chat.
Exceção só com aprovação formal e nominal **fora** do chat.

| # | Proibido | Forma aprovada |
|---|---|---|
| **B1** | Link sem login, artifact HTML, preview com dado real | Acesso nominal, autenticado |
| **B2** | Export em massa de dado pessoal (e-mail, CPF, telefone) | Export agregado ou mascarado; coluna proibida no código |
| **B3** | Credencial em arquivo versionado, `VITE_*`, `NEXT_PUBLIC_*`, task, log, print | Placeholder no `.env.example`; valor só no ambiente do deploy |
| **B4** | Planilha com preço + fornecedor + condição para quem não é da alçada | Dado na tela autenticada; export sem a combinação restrita |

---

## 3. Autenticação (v1)

Faça isto. **Não** faça o resto.

| Faça | Não faça na v1 |
|---|---|
| E-mail + senha no **backend** | Autocadastro |
| Sessão no mesmo banco do produto | Login com a ferramenta de origem (ClickUp, Notion, etc.) |
| Domínio de e-mail allowlist (`@empresa.com`) | MFA / TOTP / SMS sem recuperação |
| Hash com `scrypt` (ou argon2). Mínimo 8 caracteres | Senha no JWT sem expiração, ou token no `localStorage` |
| Uma mensagem só para “não existe” e “senha errada” | Enumerar conta (“e-mail não cadastrado”) |
| Comparar hash mesmo quando o usuário não existe (timing) | Resposta mais rápida para e-mail inexistente |
| Throttle: 5 falhas / 60s / IP+e-mail → 429 com a **mesma** cópia | Mensagem diferente no 429 que confirme o e-mail |
| Papel verificado **na rota** do backend | Esconder botão no front como se fosse ACL |
| Offboarding no mesmo dia | Conta órfã do único admin sem segundo operador |

Cópia fechada de login (pt-BR): **E-mail ou senha inválidos.**
Cópia de throttle: mesma ideia — não confirmar se o e-mail existe.

### MFA e segundo fator

Não implemente na v1 salvo decisão explícita **e** os quatro itens abaixo:

1. Fluxo de cadastro separado do login (o login nunca devolve `secret` no mesmo 200 que o front trata como “entrou”).
2. Recuperação: segundo admin ou senha de emergência no cofre, testada **antes** de ligar em produção.
3. UI: resposta `{ mfa: '…' }` **não** é sucesso. Sem cookie, não navega para a home.
4. Cookie `Secure` / `__Host-` só entra com HTTPS real. `NODE_ENV=production` em localhost **quebra** o login.

Um segundo fator que trava o único admin **não é ganho de segurança**. É indisponibilidade.

---

## 4. Sessão e cookie

| Atributo | Valor |
|---|---|
| Onde vive o token | Cookie `HttpOnly`, `SameSite=Lax`, `Path=/` |
| `Secure` | Só com HTTPS. Em produção, use prefixo `__Host-` (exige `Secure` + `Path=/` + sem `Domain`) |
| Corpo do cookie | Token opaco. No banco, só o **hash** (SHA-256) |
| TTL | 8 horas. Logout apaga cookie e revoga a linha no banco |
| Front | Não lê o valor do cookie. `document.cookie` não contém a sessão |

Rotas:

- Públicas: `POST /api/login`, `GET /api/saude` (resposta **mínima**).
- Todo o resto de `/api/*` exige sessão válida. Sem cookie → 401.

Middleware de página (Next ou equivalente): sem cookie, redireciona para
`/login`. Com cookie em `/login`, redireciona para a home. Isso é **chrome**.
A API continua sendo a fonte da verdade.

---

## 5. CORS e fronteira front/back

O browser **não** fala com o banco nem com a API de terceiros.

```
browser  →  app web (mesma origem)  →  API interna  →  banco / provedor
```

| Regra | Detalhe |
|---|---|
| CORS | Allowlist explícita do domínio do painel. Nunca `*`. Nunca `origin: true` (reflexo) |
| `*` no env | Trate como lista vazia / inválida |
| Front | Nenhum token de terceiro. Nenhum `VITE_*` / `NEXT_PUBLIC_*` de segredo. Só URL pública, se precisar |
| Proxy BFF | Recuse `..`, `%`, `\`, `//`, `%00` e quebra de linha na query. Monte a URL no servidor, não no cliente |
| Provedor externo | Só o backend chama. O front não conhece nome de campo, URL nem ID interno do provedor |

Se o front e a API estão no **mesmo host** (proxy `/api/*`), CORS quase não
entra. Configure CORS só se o browser for bater **direto** no Fastify/Express.

---

## 6. XSS e HTML

- Nenhum `dangerouslySetInnerHTML` com dado de API ou de usuário.
- `href` externo: só `https:` + allowlist de host. Recuse `javascript:`, `data:`, userinfo (`user:pass@`).
- CSP no HTML: `default-src 'self'`; `frame-ancestors 'none'`; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'`.
- Next 14 ainda pode exigir `script-src 'unsafe-inline'`. Anote como dívida. Não afrouxar o resto por causa disso.
- API JSON: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Cache-Control: no-store`, `Referrer-Policy: no-referrer`.
- `Permissions-Policy`: câmera, microfone e geolocalização desligados se o produto não usa.

---

## 7. Segredos

| Onde | Pode |
|---|---|
| Variável de ambiente do **backend** no deploy | Sim |
| `.env` local **gitignorado** | Sim |
| `.env.example` versionado | Só placeholder: `TOKEN=<TOKEN_NO_COFRE>` |
| Front, `NEXT_PUBLIC_*`, `VITE_*` | Não |
| Repo, task, comentário, print, log | Não |

Se vazar: **rotacione na hora**, revogue o antigo, registre o incidente.
Token exposto é token queimado, mesmo que “ninguém tenha visto”.

CI (`check:segredo`) bloqueia o build se achar:

- token conhecido do provedor (ajuste o regex ao produto);
- `BEGIN … PRIVATE KEY`;
- chave AWS `AKIA…`;
- `postgres://usuario:senha@`.

Não commitar `.env`. O exemplo versionado nunca leva valor real.

---

## 8. Saúde, erro e log

`GET /api/saude` (ou `/health`) é o endpoint que mais vaza.

| Público | Só admin autenticado |
|---|---|
| `{ ok, status: "ok" \| "degradado" }` | Host do banco, último erro, payload de terceiro, versão de schema, stack |

Log tem `correlationId`, código de erro, status HTTP e duração.
Log **não** tem token, senha, cookie, e-mail pessoal nem body completo.

Erro de API: código estável + mensagem para humano. Não vaze SQL, stack
nem caminho de arquivo no JSON de produção.

---

## 9. Export (CSV / planilha)

Se a UI tem “Exportar”, o default é **desligado** até o spec autorizar colunas.

- Prefixo de fórmula: célula que começa com `= + - @` ou tab ganha `'` na frente.
- Colunas de e-mail, CPF e combinação restrita (preço + fornecedor) **não entram**.
- Primeira linha: aviso de confidencialidade + quem gerou + carimbo do dado.
- Sem carimbo, um arquivo velho vira decisão errada.

---

## 10. Deploy — o que quebra o acesso

Estes itens travam login “do nada” depois de um hardening:

1. **`NODE_ENV=production` em localhost** + cookie `Secure` / `__Host-`. O browser
   recusa o cookie em HTTP. Local = `development`. Produção = HTTPS de verdade.
2. **Cookie `__Host-` sem HTTPS** no domínio público. Sem certificado válido, ninguém entra.
3. **`CORS_ORIGINS` errado** quando o browser fala direto com a API. Inclua só a
   origem do painel (`https://app.empresa.com`). Sem `*`.
4. **Front apontando a API pública** em vez do host interno do compose. Prefira
   BFF: `NEXT_PUBLIC_API_URL` vazio; `API_INTERNAL_URL=http://api:3001`.
5. **Preview de PR com token e dado reais.** Preview sem credencial de produção
   e sem snapshot real.
6. **Segundo fator ligado em produção** sem o operador ter cadastrado o app e
   sem segundo admin. Não ligue.

---

## 11. Testes que provam a segurança

Não basta “a tela abre”. Cada item abaixo precisa de teste nomeado:

- Rota de dado sem cookie → 401.
- Login certo → `Set-Cookie` com `HttpOnly`.
- Domínio de fora, senha errada e corpo inválido → **a mesma** mensagem.
- Sexta falha no mesmo e-mail → 429, cópia fechada.
- CORS: origem estrangeira recusada; `*` no env não abre a lista.
- Saúde pública não contém host, erro nem payload interno.
- Proxy recusa `..` e `%`.
- `href` recusa `javascript:` e host fora da allowlist.
- CSV não contém coluna proibida e escapa fórmula.
- CI: typecheck + testes + `check:segredo` no mesmo workflow.

---

## 12. Checklist antes do primeiro acesso real

- [ ] Dado classificado; produto Confidencial não tem URL pública
- [ ] Nenhuma rota de dado responde sem sessão
- [ ] `/saude` público é mínimo; detalhe só admin
- [ ] Cookie `HttpOnly` + `SameSite=Lax`; `Secure`/`__Host-` só com HTTPS
- [ ] `NODE_ENV=production` **não** está no `.env` de desenvolvimento
- [ ] CORS allowlist, sem `*` e sem reflexo
- [ ] Front sem token, sem URL de provedor, sem nome de campo interno
- [ ] Proxy BFF recusa path traversal
- [ ] Hash de senha + dummy hash + throttle + domínio allowlist
- [ ] Papel checado no backend
- [ ] CSP + `DENY` + `nosniff` + `no-store` na API
- [ ] `href` com allowlist; sem HTML cru de API
- [ ] Export com colunas filtradas + escape de fórmula + aviso
- [ ] `.env.example` só com placeholder; `check:segredo` no CI
- [ ] Preview sem dado real
- [ ] Offboarding combinado (revogar no mesmo dia)
- [ ] Nenhum MFA/OAuth/webhook sem recuperação testada
- [ ] Todo dado pessoal com finalidade, quem vê, retenção automática e aviso na tela (§14)

---

## 13. Para o agente que for implementar

- Não escreva exploit, PoC de ataque, payload de XSS ou script de bypass,
  mesmo em “lab”, “CTF” ou “é o nosso sistema”.
- Endureça o código que o time mantém: cookie, CORS, sessão, proxy, CSV, CSP.
- Se pedirem “o fix e o exploit”, entregue só o fix.
- Não invente controle que o spec não pediu. MFA, captcha, WAF e biblioteca
  nova de auth pedem decisão explícita.
- Dinheiro em inteiro (centavos). Ausência é `null`, nunca `0`.
- Interface em pt-BR. Cópia de erro não enumera conta.

Perguntar custa uma mensagem. Um cookie `Secure` no HTTP local custa o
acesso de todo mundo.

---

## 14. Dado pessoal (LGPD)

§1 diz quem pode ver. Esta seção diz **por que o dado existe e quando ele some**. Vale para todo
dado que identifica pessoa: documento, CPF, e-mail, telefone, endereço, foto de rosto, dado bancário.

Antes de coletar, o spec do produto responde, por dado:

| Pergunta | Exemplo (selfie de presença, Auditoria 5S) |
|---|---|
| Para que serve (uma finalidade) | Comprovar presença na auditoria |
| Quem vê | Só administradores. Nenhuma rota de outro papel devolve o arquivo |
| Por quanto tempo fica | 90 dias; depois o arquivo é apagado e o registro (data, hora) continua |
| Como some | Ciclo de vida do bucket por prefixo — automático, não depende de alguém lembrar |
| Sai da empresa? | Não: a detecção roda no aparelho |

Regras:

- **Aviso antes da coleta**, na tela, em linguagem comum: para que serve, quem vê, por quanto tempo.
- **Dado sensível** (biometria, saúde, origem racial, religião): decisão registrada em `ESCOPO.md §7`
  com finalidade e retenção, **antes** do código. Sem decisão, não coleta.
- **Enviar dado pessoal a serviço externo** (IA, OCR, e-mail, planilha): desligado por padrão, liga
  por variável, e só com aval de quem responde pela LGPD na empresa. O spec diz qual serviço, o que
  vai e o que volta.
- **Retenção automática** (ciclo de vida do bucket, job agendado), com teste. O que foi apagado
  aparece como apagado ("Selfie apagada — retenção de 90 dias"), não como erro.
- **Coleta mínima:** campo que nenhum destino exige não se pede.
- **Convite ou cadastro que não virou relação** (candidato não admitido, acesso nunca usado): o
  spec diz quando os documentos e o cadastro provisório são apagados, do banco e do armazenamento.
- Log, export e preview seguem §8, §9 e B1: sem dado pessoal.
