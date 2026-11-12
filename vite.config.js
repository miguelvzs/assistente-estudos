// Configuração de desenvolvimento: a função real continua em api/perguntar.js.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import perguntar from './api/perguntar.js';

function apiLocal(modo) {
  return {
    name: 'api-local',
    configureServer(server) {
      server.middlewares.use('/api/perguntar', async (req, res) => {
        try {
          let corpo = '';
          for await (const trecho of req) {
            corpo += trecho.toString();
            if (corpo.length > 16000) {
              res.writeHead(413, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ erro: 'A pergunta é muito grande.' }));
              return;
            }
          }

          let retorno;
          if (modo === 'demonstracao') {
            // Apenas local, sem ler chave e sem chamar a OpenAI.
            await new Promise((resolve) => setTimeout(resolve, 900));
            retorno = Response.json({
              resposta: 'DEMONSTRAÇÃO LOCAL — RESPOSTA SIMULADA\n\nProps são dados que um componente recebe. State são dados que o componente mantém e pode atualizar.\n\nExemplo: o App guarda a pergunta em um estado e a passa por props ao formulário. Ao digitar, o evento onChange atualiza esse estado.\n\nEste texto é fixo para testar a interface. A OpenAI não foi chamada.',
            });
          } else {
            const metodo = req.method || 'GET';
            const request = new Request(`http://${req.headers.host}/api/perguntar`, {
              method: metodo,
              headers: req.headers,
              body: metodo === 'GET' || metodo === 'HEAD' ? undefined : corpo,
            });
            retorno = await perguntar.fetch(request);
          }

          res.writeHead(retorno.status, Object.fromEntries(retorno.headers));
          res.end(await retorno.text());
        } catch {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ erro: 'Não foi possível processar a consulta local.' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), apiLocal(mode)],
}));
