import { ChevronDown } from 'lucide-react';
import { AIInputWithLoading } from './ui/ai-input-with-loading';
import { materias } from '../conteudo/semestre';

// Formulário do projeto: o evento onSubmit chama enviarPergunta, no App.
// O seletor de matéria muda o contexto que o servidor envia à IA.
// A caixa de digitação é o componente AI Input With Loading (Kokonut UI), adaptado.
export default function FormularioPergunta({ pergunta, aoMudar, aoEnviar, carregando, materia, aoMudarMateria }) {
  return (
    <form
      onSubmit={aoEnviar}
      aria-busy={carregando}
      className="shrink-0 bg-white px-3 pt-2 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:px-6 sm:pb-4"
    >
      <div className="mx-auto mb-2 flex max-w-3xl items-center gap-2 px-1">
        <label htmlFor="materia" className="shrink-0 text-xs font-medium text-muted-foreground">Matéria</label>
        <div className="relative min-w-0 flex-1 sm:flex-none">
          <select
            id="materia"
            value={materia}
            onChange={(evento) => aoMudarMateria(evento.target.value)}
            disabled={carregando}
            className="w-full max-w-full appearance-none truncate rounded-full border border-border bg-white py-1 pr-8 pl-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60"
          >
            <option value="">Todas do semestre</option>
            {materias.map((item) => (
              <option key={item.id} value={item.id}>{item.nome}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        </div>
      </div>
      <label htmlFor="pergunta" className="sr-only">Sua mensagem</label>
      <AIInputWithLoading
        id="pergunta"
        value={pergunta}
        onChange={aoMudar}
        loading={carregando}
        maxLength={2000}
        placeholder="Pergunte sobre seus estudos…"
      />
      <p className="mx-auto mt-1 max-w-3xl text-center text-[11px] leading-4 text-muted-foreground">
        A IA pode errar. Confira com seu material<span className="hidden sm:inline"> e não inclua dados pessoais</span>.
      </p>
    </form>
  );
}
