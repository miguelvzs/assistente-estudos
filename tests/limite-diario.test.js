import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BlobPreconditionFailedError } from '@vercel/blob';
import { reservarConsulta } from '../server/limite-diario.js';

// Armazenamento simulado com a mesma condição de escrita, sem rede/credenciais.
function armazenamento(inicial = null) {
  let dados = inicial;
  let versao = 0;
  return {
    async ler(caminho, opcoes) {
      assert.equal(caminho, 'quota/consultas.json');
      assert.equal(opcoes.useCache, false);
      return dados ? { statusCode: 200, stream: new Response(JSON.stringify(dados)).body, blob: { etag: String(versao) } } : null;
    },
    async gravar(caminho, texto, opcoes) {
      assert.equal(opcoes.access, 'private');
      assert.equal(opcoes.addRandomSuffix, false);
      if ((dados && !opcoes.allowOverwrite) || (dados && opcoes.ifMatch !== String(versao))) {
        throw new BlobPreconditionFailedError();
      }
      dados = JSON.parse(texto);
      versao++;
    },
    estado: () => dados,
  };
}

const agora = () => new Date('2026-11-13T15:00:00Z');

test('50 consultas permitidas; 51ª bloqueada inclusive após nova instância', async () => {
  const banco = armazenamento();
  for (let i = 0; i < 50; i++) assert.equal(await reservarConsulta({ ...banco, agora }), true);
  assert.equal(await reservarConsulta({ ...banco, agora }), false);
  assert.deepEqual(banco.estado(), { dia: '2026-11-13', quantidade: 50 });
});

test('20 chamadas concorrentes disputam a última vaga e só uma passa', async () => {
  const banco = armazenamento({ dia: '2026-11-13', quantidade: 49 });
  const resultados = await Promise.allSettled(Array.from({ length: 20 }, () => reservarConsulta({ ...banco, agora })));
  assert.equal(resultados.filter(r => r.status === 'fulfilled' && r.value).length, 1);
  assert.equal(banco.estado().quantidade, 50);
});

test('virada do dia ocorre à meia-noite de Brasília, não à meia-noite UTC', async () => {
  const banco = armazenamento({ dia: '2026-11-13', quantidade: 50 });
  assert.equal(await reservarConsulta({ ...banco, agora: () => new Date('2026-11-14T02:59:59Z') }), false);
  assert.equal(await reservarConsulta({ ...banco, agora: () => new Date('2026-11-14T03:00:00Z') }), true);
  assert.deepEqual(banco.estado(), { dia: '2026-11-14', quantidade: 1 });
});

test('falha na leitura, escrita, estado corrompido ou data futura bloqueia', async () => {
  await assert.rejects(reservarConsulta({ agora, ler: async () => { throw new Error('offline'); } }));
  for (const inicial of [{ dia: '2026-11-13', quantidade: -1 }, { dia: '2026-11-13', quantidade: 51 }, { dia: '2026-11-14', quantidade: 0 }, { dia: 'invalido', quantidade: 0 }]) {
    await assert.rejects(reservarConsulta({ ...armazenamento(inicial), agora }));
  }
  await assert.rejects(reservarConsulta({ ...armazenamento(), agora, gravar: async () => { throw new Error('offline'); } }));
});

test('conflitos repetidos são limitados a três tentativas, sem liberação', async () => {
  let tentativas = 0;
  await assert.rejects(reservarConsulta({ ...armazenamento(), agora, gravar: async () => {
    tentativas++;
    throw new BlobPreconditionFailedError();
  } }));
  assert.equal(tentativas, 3);
});
