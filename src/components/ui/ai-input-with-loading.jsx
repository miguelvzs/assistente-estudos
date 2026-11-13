// AI Input With Loading, da Kokonut UI (MIT), encontrado no 21st.dev.
// Adaptação: o texto (value) e a espera (loading) vêm do App, que faz a requisição real;
// removidos os temporizadores de demonstração (loadingDuration, thinkingDuration, autoAnimate).
// O botão virou type="submit" para o <form> do projeto tratar o envio.
// A caixa ganhou uma barra interna: à esquerda, um espaço livre (acessorio); à direita, o envio.
// Ver docs/CREDITOS-UI.md.
import { useEffect } from 'react';
import { CornerRightUp } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { useAutoResizeTextarea } from '../../hooks/use-auto-resize-textarea';

export function AIInputWithLoading({
  id = 'ai-input-with-loading',
  placeholder = 'Ask me anything!',
  minHeight = 44,
  maxHeight = 200,
  value,
  onChange,
  loading = false,
  maxLength,
  acessorio,
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
        <div
          className={cn(
            'w-full rounded-3xl bg-black/5 ring-1 ring-transparent transition-[background-color,box-shadow]',
            'focus-within:bg-white focus-within:shadow-[0_6px_24px_rgb(0_0_0/0.06)] focus-within:ring-primary/40'
          )}
        >
          <textarea
            id={id}
            ref={textareaRef}
            rows={1}
            placeholder={placeholder}
            maxLength={maxLength}
            value={loading ? '' : value}
            disabled={loading}
            style={{ minHeight, maxHeight }}
            className="block w-full resize-none rounded-t-3xl bg-transparent px-5 pt-4 pb-1 text-base leading-6 text-foreground outline-none placeholder:text-black/50 disabled:cursor-wait"
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
          <div className="flex items-center justify-between gap-2 px-3 pb-2.5">
            <div className="min-w-0">{acessorio}</div>
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.9 }}
              aria-label={loading ? 'Aguardando resposta' : 'Enviar mensagem'}
              className={cn(
                'grid size-9 shrink-0 place-items-center rounded-xl transition-colors',
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
