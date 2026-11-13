// Referência Kokonut UI (MIT), adaptação mínima. Ver docs/CREDITOS-UI.md.
export default function FormularioPergunta({ pergunta, aoMudar, aoEnviar, carregando }) {
  function aoPressionar(evento) {
    if (evento.key === 'Enter' && !evento.shiftKey && !evento.nativeEvent.isComposing) {
      evento.preventDefault();
      if (!carregando) evento.currentTarget.form.requestSubmit();
    }
  }
  return (
    <form className="formulario" onSubmit={aoEnviar} aria-busy={carregando}>
      <label htmlFor="pergunta">Sua mensagem</label>
      <div className="compositor">
        <textarea id="pergunta" name="pergunta" rows="2" maxLength="2000"
          value={carregando ? '' : pergunta} onChange={aoMudar} onKeyDown={aoPressionar}
          disabled={carregando} placeholder="Escreva uma dúvida de estudo..." aria-describedby="orientacao" />
        <div className="barra-compositor"><span className="estado-envio" role="status">{carregando ? 'Respondendo…' : 'Dúvidas, revisão e exercícios'}</span><button type="submit" disabled={carregando} aria-label={carregando ? 'Aguardando resposta' : 'Enviar mensagem'}><span aria-hidden="true" className={carregando ? 'indicador-envio' : ''}>{carregando ? '' : '↑'}</span></button></div>
      </div>
      <div className="acoes-formulario"><p id="orientacao" className="ajuda">Enter envia · Shift + Enter quebra linha</p><span className="ajuda">{pergunta.length}/2000</span></div>
      <p className="aviso">A IA pode errar. Confira as respostas e não inclua dados pessoais.</p>
    </form>
  );
}
