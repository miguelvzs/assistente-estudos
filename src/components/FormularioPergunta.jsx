import { AIInputWithLoading } from './ui/ai-input-with-loading';

// Formulário do projeto: o evento onSubmit chama enviarPergunta, no App.
// A caixa de digitação é o componente AI Input With Loading (Kokonut UI), adaptado.
export default function FormularioPergunta({ pergunta, aoMudar, aoEnviar, carregando }) {
  return (
    <form
      onSubmit={aoEnviar}
      aria-busy={carregando}
      className="shrink-0 bg-white px-3 pt-2 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:px-6 sm:pb-4"
    >
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
        A IA pode errar. Confira com seu material<span className="hidden sm:inline"> e não inclua dados pessoais</span> · 50 consultas/dia
      </p>
    </form>
  );
}
