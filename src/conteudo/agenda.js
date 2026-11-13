// Próximas avaliações, puxadas do calendário do Moodle IFSP Bragança em 13/11/2026.
// EXPOEXT e ET5 vêm do Documento de Especificação de Extensão 2 (Moodle).
export const avaliacoes = [
  { data: '2026-11-17', materia: 'poo', titulo: 'Seminário e projeto OO com BD (AA04)' },
  { data: '2026-11-18', materia: 'ext2', titulo: 'Mostra EXPOEXT' },
  { data: '2026-11-24', materia: 'poo', titulo: 'Prova de POO (AA05)' },
  { data: '2026-11-26', materia: 'ext2', titulo: 'Entrega ET5' },
  { data: '2026-11-27', materia: 'front', titulo: 'Prova de Front End (AA05)' },
  { data: '2026-11-29', materia: 'bd1', titulo: 'Projeto interdisciplinar de BD1' },
  { data: '2026-12-01', materia: 'poo', titulo: 'Projeto semestral de POO' },
];

// Dias inteiros entre hoje (horário de Brasília) e a data da avaliação.
export function diasAte(data, hoje = new Date()) {
  const dia = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(hoje);
  return Math.round((Date.parse(data) - Date.parse(dia)) / 86400000);
}
