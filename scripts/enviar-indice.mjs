// Envia o índice de trechos do material das aulas ao Blob privado.
// O índice é gerado fora do repositório (material das professoras não vai ao GitHub).
// Uso: vercel env run --environment production -- node scripts/enviar-indice.mjs <caminho do índice>
import { readFile } from 'node:fs/promises';
import { put, get } from '@vercel/blob';

const arquivo = process.argv[2];
if (!arquivo) {
  console.error('Informe o caminho do índice.');
  process.exit(1);
}

const dados = JSON.parse(await readFile(arquivo, 'utf8'));
if (!Array.isArray(dados.trechos) || dados.trechos.length === 0) {
  console.error('Índice vazio ou inválido.');
  process.exit(1);
}

try {
  await put('material/indice.json', JSON.stringify(dados), {
    access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json',
  });
  const salvo = await get('material/indice.json', { access: 'private', useCache: false });
  const conferido = await new Response(salvo.stream).json();
  console.log('Índice enviado ao Blob privado:', conferido.trechos.length, 'trechos.');
} catch {
  console.error('Falha ao enviar o índice; credenciais e detalhes internos omitidos.');
  process.exitCode = 1;
}
