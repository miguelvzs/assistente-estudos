// Verifica apenas Blob. Não importa a função da OpenAI nem usa sua chave.
import { get, put, del } from '@vercel/blob';
import { randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
import { reservarConsulta } from '../server/limite-diario.js';

const caminho = `verificacao/${randomUUID()}.json`;
const opcoes = {
  ler: (_, config) => get(caminho, config),
  gravar: (_, corpo, config) => put(caminho, corpo, config),
};
try {
  for (let i = 0; i < 49; i++) assert.equal(await reservarConsulta(opcoes), true);
  const disputa = await Promise.allSettled(Array.from({ length: 3 }, () => reservarConsulta(opcoes)));
  assert.equal(disputa.filter(r => r.status === 'fulfilled' && r.value).length, 1);
  assert.equal(await reservarConsulta(opcoes), false);
  const salvo = await get(caminho, { access: 'private', useCache: false });
  assert.equal((await new Response(salvo.stream).json()).quantidade, 50);
  console.log('Blob real: 50 reservas; concorrência e bloqueio da 51ª confirmados. OpenAI não chamada.');
} catch {
  console.error('Falha ao validar Blob real; credenciais e detalhes internos omitidos.');
  process.exitCode = 1;
} finally {
  try {
    await del(caminho);
    console.log('Arquivo isolado de teste removido. Contador do aplicativo não alterado.');
  } catch {
    console.error('Arquivo isolado de teste não pôde ser removido.');
    process.exitCode = 1;
  }
}
