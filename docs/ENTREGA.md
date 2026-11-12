# Preparação da entrega

## Situação
Código publicado em [https://github.com/miguelvzs/assistente-estudos](https://github.com/miguelvzs/assistente-estudos), branch `development`, com commits unitários e verificação automática aprovada. Chave no cofre e teste real local confirmados. Vercel pendente. Nada enviado no Moodle. Não apresentar o ZIP atual como aplicação publicada ou integração já validada.

## Procedimento de configuração (chave já recebida)

1. Receber a chave por formulário seguro. O valor anteriormente informado era apenas um aviso, não uma credencial, e não deve ser usado.
2. Injetar no ambiente do processo/servidor sem copiar para workspace ou logs.
3. Rodar `npm run dev` e testar uma pergunta de estudo não pessoal.
4. Confirmar texto real, status HTTP, tempo de resposta e nova tentativa. Registrar evidências sem chave.
5. Confirmar acesso ao modelo gpt-6-luna e saldo; se necessário, documentar ajuste técnico antes de alterar o modelo.

## GitHub e Vercel

O enunciado exige ambos. O código contém configuração para Vercel, mas ainda não foi publicado nem verificado nessa plataforma.

- Repositório público criado: `miguelvzs/assistente-estudos`; branch padrão `development`.
- Conferir o conteúdo versionado: nunca node_modules, .env real, logs ou chave.
- Publicar pelo serviço autorizado; manter README e docs coerentes.
- Configuração prevista da Vercel: framework Vite; build `npm run build`; saída `dist`; função `api/perguntar.js`; Node compatível.
- Credencial como `OPENAI_API_KEY` somente no servidor. Sem prefixo VITE_.
- Antes de publicar com credencial, resolver exposição de endpoint público e limites operacionais. Um limite de tokens por resposta não é teto de gastos; alertas de orçamento não garantem bloqueio.
- O contrato herdado da metodologia pede autorização específica para produção. Preparar o resultado e a configuração antes dessa etapa final.
- Testar URL publicada, formulário e função juntos em navegador sem login. `vite preview` sozinho não testa a API.
- Atualizar links GitHub/Vercel no README.

## ZIP

Incluir código-fonte, api/, testes, configurações, package.json, package-lock.json, README e docs. Excluir node_modules, dist, .git, .vercel, .env real e logs. `.env.example` vazio pode entrar. Documentos de explicação acompanham o projeto.

O ZIP entregue nesta etapa é uma cópia local verificável, com link GitHub publicado, ainda sem URL Vercel. Após publicação e teste real, atualizar README/VALIDACAO e gerar novamente o ZIP final.

## Conferência para 13/11/2026

- [x] OpenAI real respondeu a uma pergunta no teste local.
- [ ] Não há resposta simulada na versão publicada.
- [ ] Campo vazio não envia; carregamento e erro funcionam.
- [x] Repositório GitHub público com instruções e bibliotecas.
- [ ] Conferir acesso deslogado na revisão final da entrega.
- [ ] Vercel abre deslogado e a função responde.
- [ ] ZIP abre, inclui lockfile e exclui dependências/segredos.
- [ ] Ensaio cabe em 15 minutos.
- [ ] Separados link Vercel, link GitHub e ZIP para envio por Miguel.

Prazo de envio: 13/11 às 23h59. Apresentação no mesmo dia, limite de 15 minutos. Fonte: [Moodle](https://moodle.bra.ifsp.edu.br/mod/assign/view.php?id=21023).

