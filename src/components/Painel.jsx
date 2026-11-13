import MarcaIFAI from './MarcaIF';

// Props e children: Aulas 04 e 05.
// Estrutura da tela: cabeçalho fixo em cima; conversa e campo vêm em children.
export default function Painel({ titulo, subtitulo, status, acoes, children }) {
  return (
    <div className="flex h-dvh flex-col bg-white">
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border px-4 sm:h-16 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="shrink-0" aria-label={titulo}><MarcaIFAI /></h1>
          {subtitulo && (
            <p className="hidden truncate border-l border-border pl-3 text-xs leading-4 text-muted-foreground md:block">{subtitulo}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {status && (
            <span className="hidden items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground lg:inline-flex">
              <span className="size-1.5 rounded-full bg-if-verde" aria-hidden="true" />
              {status}
            </span>
          )}
          {acoes}
        </div>
      </header>
      {children}
    </div>
  );
}
