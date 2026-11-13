import { ChevronDown } from 'lucide-react';
import { AIInputWithLoading } from './ui/ai-input-with-loading';
import { materias } from '../conteudo/semestre';

// Níveis de esforço de raciocínio do modelo. O servidor só aceita estes valores.
const esforcos = [
  { id: 'low', nome: 'Esforço baixo' },
  { id: 'medium', nome: 'Esforço médio' },
  { id: 'high', nome: 'Esforço alto' },
];

// Chip com <select> nativo: acessível e funciona bem no celular.
function Chip({ id, rotulo, titulo, valor, aoMudar, desabilitado, children }) {
  return (
    <div className="relative inline-flex min-w-0">
      <label htmlFor={id} className="sr-only">{rotulo}</label>
      <select
        id={id}
        value={valor}
        onChange={(evento) => aoMudar(evento.target.value)}
        disabled={desabilitado}
        title={titulo}
        className="max-w-[10rem] appearance-none truncate rounded-full bg-white py-1.5 pr-7 pl-3 text-xs font-medium text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
    </div>
  );
}

// Formulário do projeto: o evento onSubmit chama enviarPergunta, no App.
// Os chips dentro da caixa escolhem a matéria (contexto) e o esforço de raciocínio da IA.
// A caixa de digitação é o componente AI Input With Loading (Kokonut UI), adaptado.
export default function FormularioPergunta({ pergunta, aoMudar, aoEnviar, carregando, materia, aoMudarMateria, esforco, aoMudarEsforco }) {
  const chips = (
    <div className="flex min-w-0 items-center gap-1.5">
      <Chip id="materia" rotulo="Matéria" titulo="Matéria usada como contexto" valor={materia} aoMudar={aoMudarMateria} desabilitado={carregando}>
        <option value="">Todas as matérias</option>
        {materias.map((item) => (
          <option key={item.id} value={item.id}>{item.sigla}</option>
        ))}
      </Chip>
      <Chip id="esforco" rotulo="Esforço de raciocínio" titulo="Mais esforço: respostas mais pensadas, porém mais lentas" valor={esforco} aoMudar={aoMudarEsforco} desabilitado={carregando}>
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
        placeholder="Pergunte sobre seus estudos…"
        acessorio={chips}
      />
      <p className="mx-auto mt-1 max-w-3xl text-center text-[11px] leading-4 text-muted-foreground">
        A IA pode errar. Confira com seu material<span className="hidden sm:inline"> e não inclua dados pessoais</span>.
      </p>
    </form>
  );
}
