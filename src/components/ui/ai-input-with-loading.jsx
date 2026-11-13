// AI Input With Loading — Kokonut UI (MIT), encontrado no 21st.dev.
// Adaptação: o texto (value) e a espera (loading) vêm do App, que faz a requisição real;
// removidos os temporizadores de demonstração (loadingDuration, thinkingDuration, autoAnimate).
// O botão virou type="submit" para o <form> do projeto tratar o envio.
// Ver docs/CREDITOS-UI.md.
import { useEffect } from 'react';
import { CornerRightUp } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { useAutoResizeTextarea } from '../../hooks/use-auto-resize-textarea';

export function AIInputWithLoading({
  id = 'ai-input-with-loading',
  placeholder = 'Ask me anything!',
  minHeight = 56,
  maxHeight = 200,
  value,
  onChange,
  loading = false,
  maxLength,
  className,
}) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight, maxHeight });
  const temTexto = value.trim() !== '';

  // Volta à altura mínima quando o campo é limpo ou durante o envio.
  useEffect(() => {
    if (loading || value === '') adjustHeight(true);
  }, [loading, value, adjustHeight]);

  return (
    <div className={cn('w-full', className)}>
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-2">
        <div className="relative w-full">
          <textarea
            id={id}
            ref={textareaRef}
            rows={1}
            placeholder={placeholder}
            maxLength={maxLength}
            value={loading ? '' : value}
            disabled={loading}
            style={{ minHeight, maxHeight }}
            className={cn(
              'block w-full resize-none rounded-3xl bg-black/5 py-4 pl-6 pr-14',
              'text-base leading-6 text-foreground placeholder:text-black/50',
              'outline-none ring-1 ring-transparent transition-[background-color,box-shadow]',
              'focus:bg-white focus:shadow-[0_6px_24px_rgb(0_0_0/0.06)] focus:ring-primary/40',
              'disabled:cursor-wait'
            )}
            onChange={(e) => {
              onChange(e);
              adjustHeight();
            }}
            onKeyDown={(e) => {
              // Enter envia; Shift+Enter quebra linha.
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                if (!loading) e.currentTarget.form.requestSubmit();
              }
            }}
          />
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.9 }}
            aria-label={loading ? 'Aguardando resposta' : 'Enviar mensagem'}
            className={cn(
              'absolute bottom-2.5 right-2.5 grid size-9 place-items-center rounded-xl transition-colors',
              loading
                ? 'bg-transparent'
                : temTexto
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-black/5 text-foreground'
            )}
          >
            {loading ? (
              <div
                className="size-4 animate-spin rounded-sm bg-foreground transition duration-700"
                style={{ animationDuration: '3s' }}
              />
            ) : (
              <CornerRightUp
                aria-hidden="true"
                className={cn('size-4 transition-opacity', temTexto ? 'opacity-100' : 'opacity-40')}
              />
            )}
          </motion.button>
        </div>
        <p role="status" className="h-4 text-xs text-black/60">
          <motion.span
            key={loading ? 'pensando' : 'pronto'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={loading ? 'inline-block' : 'hidden sm:inline-block'}
          >
            {loading ? 'Respondendo…' : 'Enter envia, Shift + Enter quebra linha'}
          </motion.span>
        </p>
      </div>
    </div>
  );
}
