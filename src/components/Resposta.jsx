import ChatBubble from './ChatBubble';

// Ref de montagem: rola quando um novo trecho entra, não a cada tecla digitada.
function mostrarFinal(elemento) {
  if (elemento) elemento.scrollIntoView({ block: 'nearest' });
}

export default function Resposta({ mensagens, carregando, erro, pergunta }) {
  return (
    <div className="conversa" role="log" aria-label="Conversa de estudos" aria-live="polite">
      {mensagens.length === 0 && !carregando && <div className="conversa-vazia"><span className="simbolo-estudo" aria-hidden="true">Aa</span><p>Vamos estudar?</p><span>Escreva sua dúvida para começar.</span><div className="exemplo">Por exemplo: “Como funciona a regra de três?”</div></div>}
      {mensagens.map((mensagem, indice) => (
        <div key={indice} ref={indice === mensagens.length - 1 ? mostrarFinal : null}>
          <ChatBubble variant={mensagem.role === 'user' ? 'sent' : 'received'}>
            <p className="texto-resposta">{mensagem.content}</p>
          </ChatBubble>
        </div>
      ))}
      {carregando && <div ref={mostrarFinal}><ChatBubble variant="sent"><p className="texto-resposta">{pergunta.trim()}</p></ChatBubble><ChatBubble><p className="estado">Preparando a resposta<span aria-hidden="true"> ···</span></p></ChatBubble></div>}
      {erro && <p className="erro" role="alert" ref={mostrarFinal}>{erro}</p>}
    </div>
  );
}
