# Escopo da versão OpenAI

## Objetivo e entrega
Demonstrar React consumindo API no trabalho AA04. Tema: Assistente de Estudos.
[Enunciado](https://moodle.bra.ifsp.edu.br/mod/assign/view.php?id=21023), consultado
em 12/11/2026. Entrega: GitHub, Vercel, README, ZIP sem node_modules e apresentação
de até 15 minutos. Prazo informado pelo Moodle: 13/11/2026 às 23h59.

## Incluído
Uma tela de chat: React/Vite/JavaScript, CSS, componentes, props, useState,
eventos, condicionais, map/key e Axios. Histórico apenas no navegador, com as
últimas três trocas enviadas como contexto. Apoio em estudos gerais e técnicos
para alunos do IF, sem acesso institucional ou a materiais particulares.

Servidor protege a chave OpenAI; contador privado limita 50 tentativas diárias
no total. Essas duas partes são infraestrutura adicional, construída com
pesquisa e assistência de IA; não foram encontradas nas aulas React.

## Excluído
Login, banco de alunos, persistência de conversa, upload, streaming, TypeScript,
SDK OpenAI, rotas de página e bibliotecas de interface. Não usar todos os tópicos
das aulas só para aumentar o código. A versão SUAP fica na branch `versao-suap`
com escopo/documentação próprios; não é função deste chat.

## Dados
Pergunta e até seis mensagens anteriores são enviadas à OpenAI. O app não grava
esse conteúdo; store:false não garante ausência de logs operacionais do provedor.
Não enviar dados pessoais. Chaves ficam no servidor. Blob privado armazena apenas
data e quantidade, sem IP, aluno, pergunta ou resposta.

## Decisões tomadas
| Decisão | Data | Consequência |
|---|---|---|
| Professora autorizou OpenAI, segundo Miguel | 12/11/2026 | Provedor pago aceito; não atribuir essa autorização ao enunciado |
| React mínimo das aulas e exceção do servidor | 12/11/2026 | Declarar infraestrutura adicional na apresentação |
| gpt-6-luna, até 600 tokens e chave válida no cofre | 12/11/2026 | Chamada real local confirmada; não usar a entrada antiga de aviso |
| Publicação condicionada a 50 requisições/dia | 12/11/2026 | Reserva persistente e bloqueio em falhas |
| main com deploy após merge, commits unitários | 13/11/2026 | PR de development com CI verde e commit de merge |
| ZIP e links preparados; submissão adiada | 13/11/2026 | Pedido posterior de Miguel: conferir tudo antes de enviar |
| Segunda versão básica em outra branch | 13/11/2026 | Não substituir nem misturar a versão OpenAI |

## Decisões abertas e limites
API SUAP do IFSP: acesso, autenticação e rotas acadêmicas ainda não confirmados.
Isso bloqueia a integração real da segunda versão, não o chat OpenAI.

Sem quota individual: uma pessoa pode usar as 50 consultas. Falha do provedor
também consome a vaga. O teto vale para este app, não para outras aplicações da
mesma conta. Falha do Blob bloqueia a IA. Não contratar plano pago.

Exceção ao playbook empresarial de SEGURANCA.md: exercício público sem dados
empresariais e sem login, aprovado pelo usuário. Não acrescentar MFA, sessões
ou banco de alunos para cumprir o template genérico. Publicação segue o contrato
de docs/COMMITS.md; evidências e pendências em VALIDACAO.md.

## Exceção visual posterior à entrega
Miguel solicitou componente do 21st.dev em 13/11/2026. Nesta branch: Chat Bubble e AI Input With Loading adaptados em src/components/ui, MIT preservada; Tailwind, Motion, Lucide e fonte (Open Sans, oficial do IF) autorizados por Miguel em 13/11/2026. Sem streaming. Ver spec 06 e CREDITOS-UI.md.
