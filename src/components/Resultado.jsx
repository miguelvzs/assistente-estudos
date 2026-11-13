export default function Resultado({ dados, carregando, erro }) {
  return (
    <section className="resultado" aria-live="polite" aria-busy={carregando}>
      <h2>Resultado da consulta</h2>
      {carregando && <p>Consultando...</p>}
      {erro && <p role="alert" className="erro">{erro}</p>}
      {!carregando && !erro && dados === null && <p>Escolha uma consulta acima.</p>}
      {dados !== null && <pre>{JSON.stringify(dados, null, 2)}</pre>}
    </section>
  );
}
