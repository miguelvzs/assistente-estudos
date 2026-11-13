import { get, put, BlobPreconditionFailedError } from '@vercel/blob';

// docs/specs/05-publicacao.md: reserva persistente antes de qualquer chamada paga.
export async function reservarConsulta({ ler = get, gravar = put, agora = () => new Date() } = {}) {
  const caminho = 'quota/consultas.json';
  const abortSignal = AbortSignal.timeout(8000);
  for (let tentativa = 0; tentativa < 3; tentativa++) {
    const dia = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(agora());
    const atual = await ler(caminho, { access: 'private', useCache: false, abortSignal });
    let quantidade = 0;
    if (atual) {
      if (!atual.blob.etag || atual.statusCode !== 200) throw new Error('Contador indisponível');
      const dados = await new Response(atual.stream).json();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dados.dia) || dados.dia > dia ||
          !Number.isInteger(dados.quantidade) || dados.quantidade < 0 || dados.quantidade > 50) {
        throw new Error('Contador inválido');
      }
      quantidade = dados.dia === dia ? dados.quantidade : 0;
    }
    if (quantidade >= 50) return false;
    try {
      await gravar(caminho, JSON.stringify({ dia, quantidade: quantidade + 1 }), {
        access: 'private', addRandomSuffix: false, contentType: 'application/json',
        allowOverwrite: Boolean(atual), ...(atual ? { ifMatch: atual.blob.etag } : {}), abortSignal,
      });
      return true;
    } catch (erro) {
      // Uma disputa tenta reler; qualquer outra falha bloqueia sem chamar OpenAI.
      if (!(erro instanceof BlobPreconditionFailedError)) throw erro;
    }
  }
  throw new Error('Contador ocupado');
}

export default { reservarConsulta };
