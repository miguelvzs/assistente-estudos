// Props e children: Aulas 04 e 05.
export default function Painel({ titulo, imagem, children }) {
  return (
    <section className="painel">
      <div className="topo-painel">
        <h2>{titulo}</h2>
        {imagem && <img className="mascote" src={imagem} alt="Robô assistente de estudos segurando um livro" width="80" height="80" />}
      </div>
      {children}
    </section>
  );
}
