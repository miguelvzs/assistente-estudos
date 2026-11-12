# Validação — 12/11/2026

## Estado atual
Código publicado no [GitHub](https://github.com/miguelvzs/assistente-estudos), branch development. [GitHub Actions](https://github.com/miguelvzs/assistente-estudos/actions/runs/43287035516) aprovou instalação, 12 testes simulados e build. Integração real local com OpenAI confirmada. Vercel e envio Moodle permanecem pendentes.

## Evidências atuais
- `npm test`: 12 testes aprovados, sem rede e sem chave real. Incluem validação do histórico e rejeição de papéis privilegiados.
- `npm run build`: aprovado localmente e no GitHub.
- Tela inicial do chat conferida no navegador local em desktop e celular: mascote, campo, botão e rodapé sem sobreposição observada.
- Repositório remoto conferido como público e com development como branch padrão; conteúdo enviado coincide com o histórico local.
- Arquivos versionados e histórico examinados por padrões comuns de credenciais; nenhuma ocorrência identificada. Não foram enviados node_modules, dist, logs ou .env real. Essa verificação não é garantia absoluta de segurança.

## Verificações anteriores, antes da conversão em chat
A consulta isolada foi exercitada em modo demo: campo vazio, espera, resposta simulada, nova consulta e erro 503 sem chave. Não confundir esses testes manuais com validação completa do fluxo atual de múltiplas mensagens. A consulta de dependências daquela etapa não reportou vulnerabilidades de produção.

## Pendente
- Credencial, acesso ao modelo e resposta real local confirmados. Saldo disponível e consumo acumulado não auditados.
- Ensaio manual completo de múltiplas mensagens na interface atual, incluindo erro e nova tentativa.
- Deploy Vercel, headers em produção e acesso final deslogado.
- Tempo real de resposta, consumo e limites operacionais de gastos.
- Ensaio falado de até 15 minutos e envio pelo aluno.

## Repetir
`npm ci`, `npm test`, `npm run build`. Para ensaiar sem chave: `npm run demo`. Para testar ausência de configuração: `npm run dev` sem chave. A resposta fixa da demo não comprova integração com OpenAI nem memória real do modelo.

## Conexão real confirmada
Em 12/11/2026, a função local chamou a OpenAI com gpt-6-luna e a chave do cofre; retornou HTTP 200 com explicação de props. Nenhuma credencial foi copiada para arquivos do projeto. Isto valida uma chamada local, não o deploy Vercel. O aviso da interface identifica modo demonstracao; no modo real, confirma a conexão após a primeira resposta recebida na sessão. Não é monitoramento permanente de disponibilidade.

Teste pela interface em http://127.0.0.1:5179: pergunta sobre useState retornou resposta real, campo foi limpo e aviso mudou para Conexão com a OpenAI confirmada. Modo real local iniciado; porta 5178 corresponde à demonstração anterior.
