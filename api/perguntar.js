// EXCEÇÃO DOCUMENTADA: função de servidor. Nunca é importada pelo React.
import axios from 'axios';
import limite from '../server/limite-diario.js';
import { montarInstrucoes } from '../src/conteudo/semestre.js';

// Esforço de raciocínio: o navegador escolhe só entre estes níveis.
// Tokens de raciocínio contam no limite de saída, por isso o teto cresce com o esforço.
const ESFORCOS = {
  low: { tokens: 1500, tempo: 45000 },
  medium: { tokens: 3000, tempo: 50000 },
  high: { tokens: 6000, tempo: 55000 },
};

function json(dados, status = 200) {
  return Response.json(dados, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'no-referrer',
    },
  });
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      const resposta = json({ erro: 'Use POST para enviar uma pergunta.' }, 405);
      resposta.headers.set('Allow', 'POST');
      return resposta;
    }

    // Mesma origem para navegador e função; isto não substitui autenticação.
    const origem = request.headers.get('origin');
    if (origem && origem !== new URL(request.url).origin) {
      return json({ erro: 'Origem da requisição não permitida.' }, 403);
    }
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return json({ erro: 'Envie a pergunta em JSON.' }, 415);
    }

    let dados;
    try {
      const corpo = await request.text();
      if (corpo.length > 16000) return json({ erro: 'A pergunta é muito grande.' }, 413);
      dados = JSON.parse(corpo);
    } catch {
      return json({ erro: 'A requisição contém um JSON inválido.' }, 400);
    }

    if (!dados || typeof dados.pergunta !== 'string' || !dados.pergunta.trim()) {
      return json({ erro: 'Digite uma pergunta antes de enviar.' }, 400);
    }
    const pergunta = dados.pergunta.trim();
    if (pergunta.length > 2000) {
      return json({ erro: 'Use uma pergunta com até 2.000 caracteres.' }, 400);
    }

    const historico = dados.historico === undefined ? [] : dados.historico;
    if (!Array.isArray(historico) || historico.length > 6 || historico.length % 2 !== 0) {
      return json({ erro: 'Histórico inválido. Atualize a página para recomeçar.' }, 400);
    }
    for (let i = 0; i < historico.length; i++) {
      const item = historico[i];
      if (!item || item.role !== (i % 2 === 0 ? 'user' : 'assistant') ||
          typeof item.content !== 'string' || !item.content.trim() || item.content.length > 6000) {
        return json({ erro: 'Histórico inválido. Atualize a página para recomeçar.' }, 400);
      }
    }
    const entrada = historico.map((item) => ({ role: item.role, content: item.content }));
    entrada.push({ role: 'user', content: pergunta });

    const nivel = Object.hasOwn(ESFORCOS, dados.esforco) ? dados.esforco : 'low';
    const esforco = ESFORCOS[nivel];

    const chave = process.env.OPENAI_API_KEY;
    if (!chave) {
      return json({ erro: 'A integração com a OpenAI ainda não foi configurada.' }, 503);
    }

    try {
      if (!await limite.reservarConsulta()) {
        return json({ erro: 'O limite de 50 consultas de hoje foi atingido. Tente novamente amanhã (horário de Brasília).' }, 429);
      }
    } catch {
      return json({ erro: 'Não foi possível verificar o limite diário. Tente novamente mais tarde.' }, 503);
    }

    try {
      const retorno = await axios.post('https://api.openai.com/v1/responses', {
        model: 'gpt-6-luna',
        // Instruções com o contexto do semestre; a matéria só vale se estiver na lista.
        instructions: montarInstrucoes(typeof dados.materia === 'string' ? dados.materia : ''),
        input: entrada,
        reasoning: { effort: nivel },
        max_output_tokens: esforco.tokens,
        store: false,
      }, {
        headers: { Authorization: `Bearer ${chave}` },
        timeout: esforco.tempo,
      });

      const dadosOpenAI = retorno.data;
      if (dadosOpenAI.status !== 'completed' || !Array.isArray(dadosOpenAI.output)) {
        return json({ erro: 'A IA não concluiu a resposta. Tente uma pergunta mais curta.' }, 502);
      }

      // O JSON da OpenAI pode ter outros itens além da mensagem de texto.
      let resposta = '';
      for (const item of dadosOpenAI.output) {
        if (item.type === 'message' && Array.isArray(item.content)) {
          for (const parte of item.content) {
            if (parte.type === 'output_text' && typeof parte.text === 'string') {
              resposta += parte.text + '\n';
            }
          }
        }
      }

      if (!resposta.trim()) {
        return json({ erro: 'A IA não retornou texto. Reformule a pergunta e tente novamente.' }, 502);
      }
      return json({ resposta: resposta.trim() });
    } catch (falha) {
      // Não devolver o objeto de erro do Axios: pode conter a chave nos headers.
      if (falha.code === 'ECONNABORTED') {
        return json({ erro: 'A consulta demorou demais. Tente novamente.' }, 504);
      }
      const status = falha.response?.status;
      if (status === 429) {
        return json({ erro: 'A OpenAI está com limite de uso ou saldo indisponível. Tente mais tarde.' }, 429);
      }
      if (status === 401 || status === 403 || status === 400 || status === 404) {
        return json({ erro: 'A configuração da OpenAI precisa ser verificada.' }, 503);
      }
      return json({ erro: 'Não foi possível consultar a OpenAI. Tente novamente.' }, 502);
    }
  },
};

