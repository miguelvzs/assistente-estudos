# Arquitetura da base SUAP
Clique no botão → App atualiza estados → consultarSuap → Axios GET → retorno.data →
Resultado mostra JSON. Sem código de servidor próprio ou OpenAI.

Modo demonstracao: GET /exemplos/{recurso}.json, arquivos fictícios locais.
Modo normal: endereço de src/config/suap.js; vazio rejeita a Promise e não faz rede.
Hoje todos os endereços estão vazios. Login, rotas, CORS e campos reais são abertos.
JSON genérico é deliberado: não assumir campos oficiais desconhecidos. Após validar
a API, adaptar a exibição para dados selecionados e necessários ao aluno.
