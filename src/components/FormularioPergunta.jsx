// O valor e as funções vêm do App por props (Aulas 04, 07 e 08).
export default function FormularioPergunta({ pergunta, aoMudar, aoEnviar, carregando }) {
  return (
    <form onSubmit={aoEnviar}>
      <label htmlFor="pergunta">Sua pergunta</label>
      <textarea
        id="pergunta"
        name="pergunta"
        rows="5"
        maxLength="2000"
        value={pergunta}
        onChange={aoMudar}
        disabled={carregando}
        placeholder="Ex.: Qual é a diferença entre props e state no React?"
        aria-describedby="orientacao"
      />
      <p id="orientacao" className="ajuda">
        Escreva uma dúvida de estudo, sem dados pessoais. Até 2.000 caracteres.
      </p>
      <button type="submit" disabled={carregando}>
        {carregando ? 'Consultando...' : 'Perguntar'}
      </button>
    </form>
  );
}
