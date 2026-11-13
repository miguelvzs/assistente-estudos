// Chat Bubble — shadcn-chat, Jakob Hoeg Mørk (MIT), encontrado no 21st.dev.
// Adaptação: JSX em vez de TypeScript; variantes em objetos simples em vez de cva;
// variant/layout passados explicitamente aos filhos em vez de cloneElement.
// Ver docs/CREDITOS-UI.md.
import { cn } from '../../lib/utils';
import MessageLoading from './message-loading';

// Variantes do contêiner: sent = direita (pergunta); received = esquerda.
// layout "ai" = resposta em largura total, como nos chats de IA.
const bubbleVariants = {
  sent: 'max-w-[85%] sm:max-w-[75%] items-end self-end flex-row-reverse',
  received: 'max-w-[85%] sm:max-w-[75%] items-end self-start',
  ai: 'w-full items-start self-start',
};

export function ChatBubble({ variant = 'received', layout = 'default', className, children }) {
  const estilo = layout === 'ai' ? bubbleVariants.ai : bubbleVariants[variant];
  return <div className={cn('group relative flex gap-3', estilo, className)}>{children}</div>;
}

export function ChatBubbleAvatar({ fallback, className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-full bg-white text-xs font-semibold text-primary ring-1 ring-border',
        className
      )}
    >
      {fallback}
    </span>
  );
}

// Variantes da mensagem: balão colorido (sent), balão cinza (received)
// ou texto sem fundo em largura total (ai).
const messageVariants = {
  sent: 'px-4 py-2.5 bg-primary text-primary-foreground rounded-2xl rounded-br-md',
  received: 'px-4 py-2.5 bg-secondary text-secondary-foreground rounded-2xl rounded-bl-md',
  ai: 'w-full min-w-0 pt-1 bg-transparent rounded-none',
};

export function ChatBubbleMessage({ variant = 'received', layout = 'default', isLoading = false, className, children }) {
  const estilo = layout === 'ai' ? messageVariants.ai : messageVariants[variant];
  return (
    <div className={cn('max-w-full whitespace-pre-wrap break-words text-[15px] leading-7', estilo, className)}>
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <MessageLoading />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
