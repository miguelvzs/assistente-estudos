// Renderização condicional: Aula 06.
export default function Resposta({ resposta, carregando, erro }) {
  if (carregando) {
    return <p className="estado">Consultando... Aguarde a resposta.</p>;
  }

  if (erro) {
    return <p className="erro" role="alert">{erro}</p>;
  }

  if (resposta) {
    return (
      <div>
        <p className="texto-resposta">{resposta}</p>
        <p className="aviso">Resposta gerada por IA. Confira com o material da disciplina.</p>
      </div>
    );
  }

  return <p className="estado">A resposta à sua pergunta aparecerá aqui.</p>;
}
