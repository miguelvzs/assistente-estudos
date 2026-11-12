// Formulário controlado: props, eventos e estado das Aulas 04, 07 e 08.
export default function FormularioPergunta({ pergunta, aoMudar, aoEnviar, carregando }) {
  return (
    <form className="formulario" onSubmit={aoEnviar}>
      <label htmlFor="pergunta">Sua mensagem</label>
      <textarea
        id="pergunta"
        name="pergunta"
        rows="3"
        maxLength="2000"
        value={pergunta}
        onChange={aoMudar}
        disabled={carregando}
        placeholder="Ex.: Como resolvo uma equação do segundo grau?"
        aria-describedby="orientacao"
      />
      <div className="acoes-formulario">
        <p id="orientacao" className="ajuda">Até 2.000 caracteres. Não inclua dados pessoais.</p>
        <button type="submit" disabled={carregando}>
          {carregando ? 'Respondendo...' : 'Enviar'}
        </button>
      </div>
      <p className="aviso">A IA pode errar. Confira as respostas.</p>
    </form>
  );
}
