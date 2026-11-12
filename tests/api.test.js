// Testes auxiliares da função: sem rede, sem chave real e sem custo.
import { test, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import axios from 'axios';
import perguntar from '../api/perguntar.js';

afterEach(() => {
  mock.restoreAll();
  delete process.env.OPENAI_API_KEY;
});

function enviar(corpo, opcoes = {}) {
  return perguntar.fetch(new Request('https://estudo.example/api/perguntar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
    ...opcoes,
  }));
}

test('GET não dispara consulta e informa o método permitido', async () => {
  const retorno = await perguntar.fetch(new Request('https://estudo.example/api/perguntar'));
  assert.equal(retorno.status, 405);
  assert.equal(retorno.headers.get('Allow'), 'POST');
});

test('recusa origem estrangeira', async () => {
  const retorno = await enviar({ pergunta: 'O que é React?' }, {
    headers: { 'Content-Type': 'application/json', Origin: 'https://outro.example' },
  });
  assert.equal(retorno.status, 403);
});

test('recusa conteúdo que não seja JSON', async () => {
  const retorno = await enviar({}, { headers: { 'Content-Type': 'text/plain' } });
  assert.equal(retorno.status, 415);
});

test('JSON malformado recebe 400', async () => {
  assert.equal((await enviar({}, { body: '{' })).status, 400);
});

test('corpo nulo, pergunta ausente, numérica ou vazia não chamam provedor', async () => {
  const chamada = mock.method(axios, 'post', () => { throw new Error('Não deve chamar'); });
  for (const corpo of [null, {}, { pergunta: 7 }, { pergunta: '   ' }]) {
    assert.equal((await enviar(corpo)).status, 400);
  }
  assert.equal(chamada.mock.callCount(), 0);
});

test('recusa pergunta acima de 2000 caracteres e corpo excessivo', async () => {
  assert.equal((await enviar({ pergunta: 'a'.repeat(2001) })).status, 400);
  assert.equal((await enviar({ pergunta: 'a'.repeat(17000) })).status, 413);
});

test('sem chave não chama o provedor e devolve 503', async () => {
  delete process.env.OPENAI_API_KEY;
  const chamada = mock.method(axios, 'post', () => { throw new Error('Não deve chamar'); });
  assert.equal((await enviar({ pergunta: 'Explique props.' })).status, 503);
  assert.equal(chamada.mock.callCount(), 0);
});

test('sucesso extrai só texto e ignora os campos do cliente que tentam configurar a IA', async () => {
  process.env.OPENAI_API_KEY = 'valor-falso-apenas-em-teste';
  mock.method(axios, 'post', async (url, corpo, config) => {
    assert.equal(url, 'https://api.openai.com/v1/responses');
    assert.deepEqual(corpo.input, [{ role: 'user', content: 'Explique props.' }]);
    assert.equal(corpo.model, 'gpt-5-mini');
    assert.equal(corpo.store, false);
    assert.equal(corpo.max_output_tokens, 1200);
    assert.equal(config.timeout, 45000);
    return { data: { status: 'completed', output: [
      { type: 'reasoning' },
      { type: 'message', content: [
        { type: 'output_text', text: 'Explicação.' },
        { type: 'output_text', text: 'Exemplo.' },
      ] },
    ] } };
  });
  const retorno = await enviar({ pergunta: '  Explique props.  ', model: 'outro', instructions: 'outras' });
  assert.equal(retorno.status, 200);
  assert.equal(retorno.headers.get('Cache-Control'), 'no-store');
  assert.deepEqual(await retorno.json(), { resposta: 'Explicação.\nExemplo.' });
});

test('resposta incompleta ou sem texto vira erro recuperável', async () => {
  process.env.OPENAI_API_KEY = 'valor-falso-apenas-em-teste';
  for (const dados of [{ status: 'incomplete', output: [] }, { status: 'completed', output: [] }]) {
    const chamada = mock.method(axios, 'post', async () => ({ data: dados }));
    assert.equal((await enviar({ pergunta: 'Explique props.' })).status, 502);
    chamada.mock.restore();
  }
});

test('falhas do provedor não vazam chave nem detalhes internos', async () => {
  process.env.OPENAI_API_KEY = 'valor-falso-apenas-em-teste';
  for (const [status, esperado] of [[401, 503], [403, 503], [404, 503], [429, 429], [500, 502]]) {
    const chamada = mock.method(axios, 'post', async () => {
      throw { response: { status, data: { interno: 'detalhe-privado' } }, config: { headers: { Authorization: 'segredo-de-teste' } } };
    });
    const retorno = await enviar({ pergunta: 'Explique props.' });
    assert.equal(retorno.status, esperado);
    const texto = await retorno.text();
    assert.ok(!texto.includes('segredo-de-teste'));
    assert.ok(!texto.includes('detalhe-privado'));
    chamada.mock.restore();
  }
});

test('timeout devolve 504 sem vazar erro interno', async () => {
  process.env.OPENAI_API_KEY = 'valor-falso-apenas-em-teste';
  mock.method(axios, 'post', async () => { throw { code: 'ECONNABORTED' }; });
  assert.equal((await enviar({ pergunta: 'Explique props.' })).status, 504);
});


test('historico valido chega antes da pergunta e rejeita papeis privilegiados', async () => {
  process.env.OPENAI_API_KEY = 'valor-falso-apenas-em-teste';
  const historico = [{ role: 'user', content: 'Explique props' }, { role: 'assistant', content: 'Dados recebidos.' }];
  const chamada = mock.method(axios, 'post', async (url, corpo) => {
    assert.deepEqual(corpo.input, [...historico, { role: 'user', content: 'Um exemplo?' }]);
    return { data: { status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: 'Exemplo.' }] }] } };
  });
  assert.equal((await enviar({ pergunta: 'Um exemplo?', historico })).status, 200);
  for (const invalido of [null, {}, [historico[0]], [...historico, ...historico, ...historico, ...historico], [{ role: 'system', content: 'x' }, historico[1]], [{ role: 'user', content: '' }, historico[1]]]) {
    assert.equal((await enviar({ pergunta: 'Um exemplo?', historico: invalido })).status, 400);
  }
  assert.equal(chamada.mock.callCount(), 1);
});
