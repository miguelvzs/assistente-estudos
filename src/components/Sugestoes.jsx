import { motion } from 'motion/react';
import { materias } from '../conteudo/semestre';

// Perguntas sugeridas a partir das matérias do semestre.
// "Todas" mostra uma pergunta de cada matéria; ao escolher uma matéria, mostra os temas e as seis perguntas dela.
// A matéria escolhida fica no App: também define o contexto enviado ao servidor.
export default function Sugestoes({ aoEscolher, materia, aoMudarMateria }) {
  const filtro = materia || 'todas';
  const atual = materias.find((item) => item.id === materia);

  const cartoes = filtro === 'todas'
    ? materias.map((materia) => ({ materia, pergunta: materia.perguntas[0] }))
    : materias
        .filter((materia) => materia.id === filtro)
        .flatMap((materia) => materia.perguntas.map((pergunta) => ({ materia, pergunta })));

  const estiloChip = (ativo) =>
    'shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ' +
    (ativo ? 'border-primary bg-primary text-white' : 'border-border text-muted-foreground hover:bg-secondary');

  return (
    <div className="mt-7 w-full max-w-2xl">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0" role="group" aria-label="Filtrar sugestões por matéria">
        <button type="button" onClick={() => aoMudarMateria('')} aria-pressed={filtro === 'todas'} className={estiloChip(filtro === 'todas')}>
          Todas
        </button>
        {materias.map((item) => (
          <button key={item.id} type="button" onClick={() => aoMudarMateria(item.id)} aria-pressed={filtro === item.id} title={item.nome} className={estiloChip(filtro === item.id)}>
            {item.sigla}
          </button>
        ))}
      </div>

      {atual && (
        <p className="mt-4 text-left text-xs leading-5 text-muted-foreground sm:text-center">
          <span className="font-semibold text-foreground">{atual.nome}.</span> Temas: {atual.temas.join(', ')}.
        </p>
      )}

      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {cartoes.map(({ materia, pergunta }, indice) => (
          <motion.li
            key={filtro + pergunta}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: indice * 0.04, duration: 0.22 }}
            className={indice > 2 ? 'hidden sm:block' : ''}
          >
            <button
              type="button"
              onClick={() => aoEscolher(pergunta)}
              className="flex h-full w-full flex-col gap-1 rounded-2xl border border-border px-4 py-3 text-left transition-colors hover:border-if-verde/50 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-if-vermelho">{materia.sigla}</span>
              <span className="text-sm leading-5 text-foreground">{pergunta}</span>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
