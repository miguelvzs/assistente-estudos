# Integração real SUAP: pendências

Verificação pública em 13/11/2026: https://suap.ifsp.edu.br/api/ e /api/docs/
retornaram 404. /o/authorize/ encaminhou ao login. O login do Moodle usa OAuth,
mas isso não libera nosso aplicativo nem autoriza reutilizar seu client_id.

O [IFRN publica exemplos](https://ifrn.github.io/suapi/) e um
[cliente JavaScript](https://github.com/ifrn-oficial/cliente_suap_javascript).
Essas fontes pertencem ao IFRN. Não provam as mesmas rotas/permissões no IFSP.
O [IFSP menciona APIs do app Aluno](https://www.ifsp.edu.br/acoes-e-programas/87-desenvolvimento-institucional/tecnologia-da-informacao/4231-atualizacoes-no-suap-novembro-2023),
mas esse anúncio não traz contrato completo para nossa aplicação.

Confirmar com a documentação/TI do IFSP:
1. Se alunos podem registrar aplicações e quais escopos de leitura são liberados.
2. Rotas oficiais para disciplinas, notas/faltas e horários, com exemplo anonimizado.
3. Método de autorização para aplicação no navegador e necessidade de segredo.
4. CORS: quais domínios podem fazer as consultas diretamente.
5. Limites de uso e regras de dados pessoais.

Solicitação reenviada pela conta educacional ao suporte em 13/11/2026; resposta ainda não verificada.
Veja o [registro do contato](CONTATO-SUPORTE-SUAP.md).
Sem as informações necessárias, manter src/config/suap.js vazio.
Não tentar contornar CAPTCHA, CORS, login ou permissões. Não usar scraping como
substituto silencioso de uma API. Não armazenar senha do aluno nesta aplicação.
