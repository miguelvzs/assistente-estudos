// Listas, key e condições: Aula 06. Dados recebidos por props: Aula 04.
export default function Resposta({ mensagens, carregando, erro }) {
  return (
    <div className="conversa">
      {mensagens.length === 0 && <div className="conversa-vazia"><p>O que você está estudando?</p><span>Tire dúvidas, revise conteúdos ou pratique exercícios.</span></div>}
      {mensagens.map((mensagem, indice) => (
        <article className={'mensagem ' + mensagem.role} key={indice}>
          <strong>{mensagem.role === 'user' ? 'Você' : 'Assistente'}</strong>
          <p className="texto-resposta">{mensagem.content}</p>
        </article>
      ))}
      {carregando && <p className="estado">Respondendo...</p>}
      {erro && <p className="erro" role="alert">{erro}</p>}
    </div>
  );
}




