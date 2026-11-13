// Busca trechos do material das aulas (Moodle) para basear as respostas da IA.
// O índice fica no Blob privado (material/indice.json); não vai ao GitHub nem ao navegador.
// Algoritmo: BM25, a mesma ideia de ranqueamento de buscadores, sem biblioteca extra.
import { get } from '@vercel/blob';

const PARADAS = new Set(('a o e é de da do das dos em no na nos nas um uma uns umas para por com sem que se como ' +
  'mais mas ou ao aos à às seu sua seus suas ele ela eles elas isso esse essa este esta qual quais quando onde ' +
  'me te lhe nos vos meu minha eu tu voce você sobre entre ate até ja já nao não sim ser ter foi são sao tem ' +
  'pode pelo pela pelos pelas explique explica exemplo exemplos mostre dê de diferença the and of to in is').split(' '));

export function palavras(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9_]+/).filter((p) => p.length > 1 && !PARADAS.has(p));
}

// Prepara as estatísticas do BM25 uma vez por índice.
export function preparar(dados) {
  const docs = dados.trechos.map((t) => {
    const termos = palavras(t.a + ' ' + t.t);
    const freq = new Map();
    for (const p of termos) freq.set(p, (freq.get(p) || 0) + 1);
    return { ...t, freq, tam: termos.length };
  });
  const df = new Map();
  for (const d of docs) for (const p of d.freq.keys()) df.set(p, (df.get(p) || 0) + 1);
  const media = docs.reduce((s, d) => s + d.tam, 0) / Math.max(docs.length, 1);
  return { docs, df, media };
}

export function buscar(indice, pergunta, materia = '', limite = 4) {
  const termos = [...new Set(palavras(pergunta))];
  if (termos.length === 0) return [];
  const n = indice.docs.length;
  const k1 = 1.4, b = 0.75;
  const resultados = [];
  for (const d of indice.docs) {
    if (materia && d.m !== materia) continue;
    let nota = 0;
    for (const p of termos) {
      const f = d.freq.get(p);
      if (!f) continue;
      const idf = Math.log(1 + (n - indice.df.get(p) + 0.5) / (indice.df.get(p) + 0.5));
      nota += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.tam / indice.media));
    }
    if (nota > 0) resultados.push({ nota, d });
  }
  resultados.sort((x, y) => y.nota - x.nota);
  // Evita repetir o mesmo arquivo e descarta acertos fracos.
  const melhor = resultados[0]?.nota || 0;
  const vistos = new Set();
  const saida = [];
  for (const { nota, d } of resultados) {
    if (nota < Math.max(1, melhor * 0.35) || vistos.has(d.a)) continue;
    vistos.add(d.a);
    saida.push({ materia: d.m, arquivo: d.a, secao: d.s, texto: d.t });
    if (saida.length === limite) break;
  }
  return saida;
}

let cache = null;

async function carregar() {
  if (cache) return cache;
  const arquivo = await get('material/indice.json', { access: 'private', abortSignal: AbortSignal.timeout(6000) });
  if (!arquivo || arquivo.statusCode !== 200) throw new Error('Índice indisponível');
  cache = preparar(await new Response(arquivo.stream).json());
  return cache;
}

// Nunca bloqueia a resposta: sem índice, a IA responde só com o contexto geral.
export async function buscarTrechos(pergunta, materia) {
  try {
    return buscar(await carregar(), pergunta, materia);
  } catch {
    return [];
  }
}

export default { buscarTrechos };
