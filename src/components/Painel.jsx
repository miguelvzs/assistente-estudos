import { GraduationCap } from 'lucide-react';

// Props e children: Aulas 04 e 05.
// Estrutura da tela: cabeçalho fixo em cima; conversa e campo vêm em children.
export default function Painel({ titulo, subtitulo, status, acao, children }) {
  return (
    <div className="flex h-dvh flex-col bg-white">
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground" aria-hidden="true">
            <GraduationCap className="size-[18px]" />
          </span>
          <div className="min-w-0 leading-tight">
            <h1 className="truncate text-[15px] font-semibold tracking-tight">{titulo}</h1>
            {subtitulo && <p className="hidden truncate text-xs text-muted-foreground sm:block">{subtitulo}</p>}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {status && (
            <span className="hidden items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              {status}
            </span>
          )}
          {acao}
        </div>
      </header>
      {children}
    </div>
  );
}
