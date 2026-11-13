# Versão SUAP básica — branch separada

Se algo aqui conflitar com o código atual, este arquivo vence e o código muda.
Miguel pediu uma alternativa mais básica, separada da versão OpenAI, em 13/11/2026.

## Interface
Uma página com três opções de consulta: disciplinas, notas/faltas e horários.
Resultado, carregamento e erro. Sem chat, IA, servidor próprio, contador ou
histórico. React básico, useState, eventos, condicionais e Axios GET.

## Integração aberta
Não foi localizada documentação pública suficiente da API acadêmica do IFSP.
/api/ e /api/docs/ retornaram 404; /o/authorize/ encaminhou ao login.
A API do IFRN e seu exemplo JavaScript não comprovam compatibilidade no IFSP.
Não inventar rotas, campos de resposta, tokens ou um client_id.

A base terá URLs vazias por consulta e erro explícito de integração pendente.
Um modo de demonstração local usa arquivos JSON fictícios claramente rotulados,
servidos pelo Vite e consultados com Axios GET. Não apresentar essa demonstração
como consumo real do SUAP ou entrega concluída de integração institucional.

Só habilitar chamadas reais depois de confirmar rotas oficiais, autorização,
formato da resposta e CORS. Não coletar senha SUAP no aplicativo nem incluir
credencial em VITE_*. Login e servidor permanecem decisões abertas.

## Pronto nesta etapa
Código mínimo da interface, demonstrador local, documentação de cada arquivo,
roteiro curto, build e estados básicos conferidos. Integração real fica bloqueada
pela documentação/permissão institucional. ZIP próprio identificado como base.
