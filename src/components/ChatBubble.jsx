// Adaptação simplificada de Jakob Hoeg Mørk (MIT). Ver docs/CREDITOS-UI.md.
export default function ChatBubble({ variant = 'received', children }) {
  return (
    <article className={'chat-bubble ' + variant}>
      <span className="avatar" aria-hidden="true">{variant === 'sent' ? 'V' : 'IF'}</span>
      <div className="chat-bubble-message">
        <strong>{variant === 'sent' ? 'Você' : 'Assistente'}</strong>
        {children}
      </div>
    </article>
  );
}
