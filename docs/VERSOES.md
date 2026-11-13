# Duas versões do trabalho

| Branch | Proposta | Documentação |
|---|---|---|
| main | Chat com OpenAI e limite diário; versão de entrega | README e docs desta branch |
| development | Manutenção da versão OpenAI antes do merge | Mesmos guias atualizados com cada alteração |
| versao-suap | Consulta acadêmica básica; integração IFSP ainda não confirmada | README e docs exclusivos dessa branch |

A versão SUAP não é uma tela alternativa do chat e não deve ser mesclada na main
para substituir a entrega. Para estudar uma versão, abrir a branch correspondente.
Cada ZIP deve indicar claramente a versão. Simulação SUAP, se usada para ensinar
a interface, não comprova consumo da API institucional.

OpenAI: useState, props, formulário, Axios e lista de mensagens no navegador;
servidor e contador são exceções estudadas com pesquisa e assistência de IA.
SUAP: objetivo de reduzir a interface a botões de consulta e dados acadêmicos.
Autenticação, rotas e CORS do IFSP precisam ser confirmados antes de declarar
integração real ou prometer que dispensa servidor.
