> Atualização aprovada: chat com histórico transitório em useState substitui a consulta isolada e a antiga exclusão de histórico. Consulte docs/CHAT.md (ou CHAT.md nesta pasta) e docs/specs/02-chat.md. Sem persistência; últimas 3 trocas enviadas à API. As descrições anteriores de resposta única são históricas.

# Escopo

## 1. Objetivo
Demonstrar React consumindo uma API. Fonte: [AA04](https://moodle.bra.ifsp.edu.br/mod/assign/view.php?id=21023), lida em 12/11/2026. Tema confirmado na listagem do curso 587: API Assistente de Estudos.

## 2. Entrega
GitHub, Vercel, README e ZIP sem node_modules; apresentação de até 15 minutos. Os links precisam funcionar em outro navegador deslogado. Nenhum envio automático ao Moodle.

## 3. Incluído
Uma tela com formulário e resposta, React/Vite/JavaScript, CSS simples, componentes, props, useState, eventos, condicionais e Axios POST. Função de servidor na Vercel para proteger a chave. Documentação completa e ensaio guiado.

## 4. Excluído
Histórico, useEffect sem necessidade, rotas, autenticação, banco, upload, streaming, SDK de IA, TypeScript, frameworks de CSS e bibliotecas de estado. O conjunto das aulas é o limite de conteúdo, não uma lista de recursos a usar integralmente.

## 5. Dados
Pergunta didática e resposta: transitórias; não gravadas pelo app. Chave OpenAI: restrita, só no ambiente do servidor. Não usar dados pessoais nas perguntas. O provedor recebe a pergunta; store:false não significa ausência de toda retenção operacional pelo provedor.

## 6. Etapas
Contexto → tela e função → testes simulados e build → chave real quando Miguel fornecer → teste real → GitHub/Vercel → ZIP final e ensaio. Estado e evidências em VALIDACAO.md.

## 7. Decisões e exceções
- Miguel confirmou que a professora autorizou OpenAI apesar de o enunciado pedir API gratuita. Informação do usuário, não constante do texto do Moodle.
- Miguel aceitou função mínima na Vercel como exceção ao conteúdo de React; o restante permanece básico.
- Miguel quer documentação de tudo e apresentação de 15 minutos.
- Miguel informou que fornecerá a chave depois. Não ler nem utilizar o valor anteriormente salvo no cofre; não fazer chamadas reais nesta etapa.
- Exceção ao playbook empresarial: este exercício é público, sem dados empresariais e sem autenticação, conforme escopo aprovado. Não adicionar login, sessões, MFA, banco ou estrutura empresarial para cumprir o template genérico.
- Preparação local usa adaptador de desenvolvimento e respostas simuladas explícitas. São ferramentas auxiliares da camada de servidor, não conteúdo apresentado como aula de React.
- Modelo técnico provisório: gpt-5-mini, sem seleção pelo usuário do site; validar acesso/qualidade quando houver chave. Não afirmar que Miguel escolheu esse modelo.
- ABERTO: nome do repositório público e projeto Vercel; disponibilidade da chave, acesso ao modelo e saldo; confirmação do funcionamento publicado.
- Publicação: preparar resultado antes de pedir autorização de produção exigida pelo contrato de commits. Não publicar nesta etapa.

## 8. Limitações
Sem controle global de gastos ou usuários. Limites de caracteres e tokens contêm uma chamada, não o gasto acumulado. Antes de expor uma chave em endpoint público, definir limites operacionais da conta/projeto; não tratar alertas de orçamento como bloqueio garantido. Simulação não satisfaz a entrega final de consumo real.

