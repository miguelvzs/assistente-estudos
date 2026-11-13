import { CalendarDays } from 'lucide-react';
import { avaliacoes, diasAte } from '../conteudo/agenda';
import { materias } from '../conteudo/semestre';

// Próximas avaliações do semestre. "Plano de estudo" envia um pedido de plano até a data.
export default function Agenda({ aoPedirPlano }) {
  const proximas = avaliacoes.filter((item) => diasAte(item.data) >= 0).slice(0, 4);
  if (proximas.length === 0) return null;

  return (
    <section className="mt-7 w-full max-w-2xl text-left" aria-labelledby="titulo-agenda">
      <h3 id="titulo-agenda" className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
        <CalendarDays className="size-4 text-if-vermelho" aria-hidden="true" />
        Próximas avaliações
      </h3>
      <ul className="divide-y divide-border border-y border-border">
        {proximas.map((item) => {
          const materia = materias.find((m) => m.id === item.materia);
          const dias = diasAte(item.data);
          const [, mes, dia] = item.data.split('-');
          const quando = dias === 0 ? 'hoje' : dias === 1 ? 'amanhã' : 'em ' + dias + ' dias';
          const pedido = 'Monte um plano de estudo de ' + Math.max(dias, 1) + ' dia(s) para "' + item.titulo + '" (' + materia.nome + '), em ' + dia + '/' + mes + '. Divida por dia, com os temas da disciplina e um exercício por dia.';
          return (
            <li key={item.data + item.titulo} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.titulo}</p>
                <p className="text-xs text-muted-foreground">{dia}/{mes}, {quando}</p>
              </div>
              <button
                type="button"
                onClick={() => aoPedirPlano(item.materia, pedido)}
                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-primary ring-1 ring-border transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary"
              >
                Plano de estudo
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
