import { BookOpen, ChevronDown, Dumbbell, Gauge } from 'lucide-react';
import { AIInputWithLoading } from './ui/ai-input-with-loading';
import { materias } from '../conteudo/semestre';

// Níveis de esforço de raciocínio do modelo. O servidor só aceita estes valores.
const esforcos = [
  { id: 'low', nome: 'Baixo' },
  { id: 'medium', nome: 'Médio' },
  { id: 'high', nome: 'Alto' },
];

const estiloChip = 'rounded-full py-1.5 text-xs font-medium ring-1 transition-colors focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60';

// Chip com <select> nativo: acessível e funciona bem no celular.
// No celular o ícone some para caber; no computador fica à esquerda e a seta à direita, com espaço reservado (pl-7, pr-7) para não cobrir o texto.
function Chip({ id, rotulo, titulo, icone: Icone, valor, aoMudar, desabilitado, children }) {
  return (
    <div className="relative inline-flex shrink-0">
      <label htmlFor={id} className="sr-only">{rotulo}</label>
      <Icone className="pointer-events-none absolute top-1/2 left-2.5 hidden sm:block size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <select
        id={id}
        value={valor}
        onChange={(evento) => aoMudar(evento.target.value)}
        disabled={desabilitado}
        title={titulo}
        className={estiloChip + ' appearance-none bg-white pr-7 pl-3 sm:pl-7 text-muted-foreground ring-border hover:text-foreground'}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
    </div>
  );
}

// Formulário do projeto: o evento onSubmit chama enviarPergunta, no App.
// Os chips dentro da caixa ligam o treino e escolhem a matéria e o esforço de raciocínio da IA.
// A caixa de digitação é o componente AI Input With Loading (Kokonut UI), adaptado.
export default function FormularioPergunta({ pergunta, aoMudar, aoEnviar, carregando, materia, aoMudarMateria, esforco, aoMudarEsforco, treino, aoMudarTreino }) {
  // Em telas estreitas a linha de chips rola para o lado em vez de encavalar.
  const chips = (
    <div className="-my-1 flex min-w-0 items-center gap-1.5 overflow-x-auto py-1 pl-0.5 [scrollbar-width:none]">
      <button
        type="button"
        onClick={() => aoMudarTreino(!treino)}
        aria-pressed={treino}
        disabled={carregando}
        title="Modo treino: a IA propõe exercícios e corrige suas respostas"
        className={estiloChip + ' inline-flex shrink-0 items-center gap-1 px-2.5 sm:pr-3 ' + (treino ? 'bg-primary text-white ring-primary' : 'bg-white text-muted-foreground ring-border hover:text-foreground')}
      >
        <Dumbbell className="size-3.5" aria-hidden="true" />
        <span className="sr-only sm:not-sr-only">Treino</span>
      </button>
      <Chip id="materia" rotulo="Matéria" titulo="Matéria usada como contexto" icone={BookOpen} valor={materia} aoMudar={aoMudarMateria} desabilitado={carregando}>
        <option value="">Todas</option>
        {materias.map((item) => (
          <option key={item.id} value={item.id}>{item.sigla}</option>
        ))}
      </Chip>
      <Chip id="esforco" rotulo="Esforço de raciocínio" titulo="Esforço de raciocínio: mais esforço, resposta mais pensada e mais lenta" icone={Gauge} valor={esforco} aoMudar={aoMudarEsforco} desabilitado={carregando}>
        {esforcos.map((item) => (
          <option key={item.id} value={item.id}>{item.nome}</option>
        ))}
      </Chip>
    </div>
  );

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
        placeholder={treino ? 'Peça um exercício ou responda o atual…' : 'Pergunte sobre seus estudos…'}
        acessorio={chips}
      />
      <p className="mx-auto mt-1 max-w-3xl text-center text-[11px] leading-4 text-muted-foreground">
        A IA pode errar. Confira com seu material<span className="hidden sm:inline"> e não inclua dados pessoais</span>.
      </p>
    </form>
  );
}
