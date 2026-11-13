# Assistente acadêmico — base SUAP

**Branch `versao-suap`. Interface básica pronta; integração real com o IFSP não confirmada.**
Esta versão é independente do chat OpenAI publicado na main. Não há IA, servidor
próprio, chave OpenAI, contador diário ou conversa. Não entregar como API SUAP funcionando.

## Executar
Node 22.12+ e npm.

```powershell
npm ci
npm run dev
```

No modo normal, clicar em uma consulta informa que a integração não está configurada.
Para estudar o fluxo GET com dados fictícios locais:

```powershell
npm run demo
```

O aviso identifica a demonstração. Axios lê JSON local; não acessa o SUAP. Exemplos
não são dados de Miguel nem reproduzem um contrato confirmado da API institucional.

## Comandos
| Comando | Resultado |
|---|---|
| npm run dev | Interface com integração real desativada enquanto faltam rotas/autorização |
| npm run demo | Interface com três arquivos JSON fictícios, via Axios GET |
| npm run build | Compila o frontend |
| npm run preview | Serve o build; não habilita API ou modo demo |

## Documentação
- [Explicação de cada arquivo e fluxo](docs/EXPLICACAO.md)
- [Roteiro curto de apresentação](docs/APRESENTACAO-15-MIN.md)
- [Relação com as aulas](docs/MAPA-DAS-AULAS.md)
- [O que falta confirmar no IFSP](docs/INTEGRACAO-SUAP.md)
- [Verificações](docs/VALIDACAO.md)
- [Contagem de código](docs/INVENTARIO.md)
- [Organização das versões](docs/VERSOES.md)

## Antes de habilitar o SUAP
Confirmar documentação, rotas, permissões, autenticação e CORS do IFSP. Só então
preencher src/config/suap.js e adaptar a apresentação da resposta ao contrato real.
Não colocar senha, token ou client_secret em arquivos React ou variáveis VITE_.
Não reutilizar o client_id do Moodle. Não criar proxy para contornar restrições.

As dependências são React, ReactDOM, Axios, Vite e plugin React; versões exatas em
package.json. O CI compila esta branch. Deploy automático dessa branch está desligado
em vercel.json para não confundir a base com a entrega OpenAI.

Código preparado com assistência de IA para estudo e conferência por Miguel.
