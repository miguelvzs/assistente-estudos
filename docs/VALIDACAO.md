# Validação — 12/11/2026

## Veredito
Implementação e documentação locais preparadas. Build e testes simulados passaram. Não foi feita chamada real à OpenAI, nem publicação GitHub/Vercel, nem envio Moodle. A chave será fornecida depois.

## Evidências

| Verificação | Resultado |
|---|---|
| `npm test` | 11 testes passaram, zero falhas; Axios substituído, sem rede |
| `npm run build` | Build Vite concluído; 78 módulos transformados |
| `npm audit --omit=dev --audit-level=high` | Zero vulnerabilidades reportadas nas dependências de produção na consulta realizada |
| Navegador: estado inicial | Campo vazio, botão e mensagem inicial presentes |
| Navegador: envio vazio | Mensagem de validação exibida |
| Navegador: consulta simulada | Botão/campo desabilitados durante espera; texto simulado visível depois |
| Navegador: nova consulta | Resposta anterior removida na espera; nova consulta liberada |
| Navegador: falta de chave | Função real local retornou 503 e tela mostrou configuração pendente; botão liberado |
| Desktop e mobile | Inspeção visual; conteúdo sem estouro horizontal no preset mobile |
| Console da demonstração | Sem erros de execução observados; mensagens normais do Vite/React |
| API sem credencial | Não consulta o provedor; conferido também em teste unitário |

O 503 na aba de teste sem chave é esperado, não sucesso da integração. A função de nuvem ainda não foi executada na Vercel. A configuração de headers de produção não foi verificada em deploy.

## Limitações

- Chave válida, saldo, acesso ao modelo e qualidade da resposta real não conferidos.
- Não medido tempo real de resposta nem consumo da OpenAI.
- Não há limite global de gastos ou rate limit de produção; preparar operação antes de expor endpoint com chave.
- Testes automatizados cobrem a função; a interface foi conferida manualmente no navegador, não por uma suíte de UI instalada no projeto.
- A detecção de vulnerabilidades é um retrato da consulta, não garantia permanente de segurança.
- As aulas foram consultadas nas cópias locais; enunciado/tema foram conferidos ao vivo no Moodle na estruturação.

## Como repetir

`npm ci`, `npm test`, `npm run build`. Para interface sem chave: `npm run demo`, enviar a pergunta de exemplo. Para validar configuração ausente: `npm run dev` sem chave e consultar. Ambos os casos não comprovam consumo real.
