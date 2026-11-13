# Roteiro da base SUAP — 8 a 10 minutos

Não apresentar esta versão como integração institucional concluída.

1. 0–1 min: explicar que é uma alternativa básica com três consultas. Mostrar o
   aviso: dados fictícios locais; acesso IFSP ainda não confirmado.
2. 1–3 min: npm run demo, clicar em Disciplinas e depois Notas e faltas. Explicar
   que Axios consulta JSON local e que os exemplos não são dados de Miguel.
3. 3–5 min: abrir App.jsx. Explicar os três useState, map/key e onClick.
4. 5–7 min: abrir services/suap.js. Explicar GET, Promise, then/catch, retorno.data
   e o timeout. Mostrar endereços vazios no modo normal.
5. 7–8 min: abrir Resultado.jsx; condições de vazio, espera, falha e resultado.
6. 8–10 min: explicar limites. Autenticação, CORS e rotas reais dependem do IFSP.
   Código preparado com pesquisa e assistência de IA; não foi integração validada.

Perguntas: por que sem useEffect? Consulta nasce do clique. Por que sem servidor?
A base local não precisa; a solução real depende do contrato de autenticação.
Por que JSON na tela? Formato de estudo, sem supor campos da API não confirmada.
Onde a senha fica? Não há coleta de senha nesta base. Não usar senha em código React.

Antes de apresentar: saber explicar cada estado, o momento da requisição e por
que uma resposta simulada não comprova consumo real do SUAP.
