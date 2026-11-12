// Props e children: Aulas 04 e 05.
export default function Painel({ titulo, children }) {
  return (
    <section className="painel">
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}
