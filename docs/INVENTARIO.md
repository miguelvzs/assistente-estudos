# Inventário atual — 13/11/2026

Contagem de linhas não vazias e não iniciadas por //, com a formatação atual.
Não é medida de dificuldade nem quantidade de linhas alteradas. CSS tem várias
regras numa linha. Base React (main.jsx/index.html), lockfile, testes, documentos
e imagem não entram na tabela principal.

| Arquivo | Linhas de código |
|---|---:|
| src/App.jsx | 63 |
| src/components/Painel.jsx | 12 |
| src/components/FormularioPergunta.jsx | 25 |
| src/components/Resposta.jsx | 15 |
| src/services/api.js | 6 |
| src/App.css | 49 |
| api/perguntar.js | 111 |
| server/limite-diario.js | 31 |
| vite.config.js | 46 |

A função OpenAI tinha 103 linhas antes do limite. Agora há a chamada de reserva
na função e um módulo separado para o contador; não apresentar 103 como total
atual do servidor. Testes e adaptador Vite são ferramentas auxiliares.

Para reproduzir (Python, na raiz):

```python
from pathlib import Path
for nome in ['api/perguntar.js', 'server/limite-diario.js']:
    linhas = Path(nome).read_text(encoding='utf-8').splitlines()
    print(nome, sum(bool(l.strip()) and not l.lstrip().startswith('//') for l in linhas))
```

Versões exatas em package.json e package-lock.json. As versões não são exigências
da professora. Reaproveitamento conceitual das aulas 02–09, detalhado no mapa.
