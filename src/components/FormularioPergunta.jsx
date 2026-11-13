import { BookOpen, Dumbbell, Gauge } from 'lucide-react';
import { AIInputWithLoading } from './ui/ai-input-with-loading';
import { MenuSelecao } from './ui/menu-selecao';
import { materias } from '../conteudo/semestre';

// Níveis de esforço de raciocínio do modelo. O servidor só aceita estes valores.
const esforcos = [
  { id: 'low', nome: 'Baixo', descricao: 'Mais rápido, para dúvidas diretas' },
  { id: 'medium', nome: 'Médio', descricao: 'Pensa mais antes de responder' },
  { id: 'high', nome: 'Alto', descricao: 'Mais profundo, para exercícios difíceis' },
];

const opcoesMateria = [
  { id: '', nome: 'Todas as matérias', descricao: 'Contexto geral do semestre', sigla: 'Todas' },
  ...materias.map((m) => ({ id: m.id, nome: m.sigla, descricao: m.nome, sigla: m.sigla })),
];

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
        className={'inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium ring-1 transition-colors focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60 sm:pr-3 ' + (treino ? 'bg-primary text-white ring-primary' : 'bg-white text-muted-foreground ring-border hover:text-foreground')}
      >
        <Dumbbell className="size-3.5" aria-hidden="true" />
        <span className="sr-only sm:not-sr-only">Treino</span>
      </button>
      <MenuSelecao
        id="materia"
        rotulo="Matéria"
        titulo="Matéria usada como contexto"
        icone={BookOpen}
        valor={materia}
        opcoes={opcoesMateria}
        curto={(opcao) => opcao.sigla}
        aoMudar={aoMudarMateria}
        desabilitado={carregando}
      />
      <MenuSelecao
        id="esforco"
        rotulo="Esforço de raciocínio"
        titulo="Quanto a IA pensa antes de responder"
        icone={Gauge}
        valor={esforco}
        opcoes={esforcos}
        aoMudar={aoMudarEsforco}
        desabilitado={carregando}
      />
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
