// Props e children: Aulas 04 e 05.
export default function Painel({ titulo, imagem, status, children }) {
  return (
    <section className="painel">
      <div className="topo-painel">
        <div><h2>{titulo}</h2>{status && <p className="status-integracao">{status}</p>}</div>
        {imagem && <img className="mascote" src={imagem} alt="Robô de estudos com símbolo da OpenAI no peito e do IF no livro" width="80" height="80" />}
      </div>
      {children}
    </section>
  );
}


