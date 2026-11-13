// Props e children: Aulas 04 e 05.
export default function Painel({ titulo, status, children }) {
  return (
    <section className="painel">
      <div className="topo-painel">
        <div><h2>{titulo}</h2>{status && <p className="status-integracao">{status}</p>}</div>
      </div>
      {children}
    </section>
  );
}



