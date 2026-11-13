// Símbolo oficial dos Institutos Federais (Manual da Marca 2015, Setec/MEC).
// Geometria e cores copiadas do arquivo em domínio público do Wikimedia Commons:
// https://commons.wikimedia.org/wiki/File:Instituto_Federal_Marca_2015.svg
export function SimboloIF({ className }) {
  return (
    <svg viewBox="0 0 76 100" className={className} aria-hidden="true" focusable="false">
      <circle cx="14" cy="14" r="11" fill="#cd191e" />
      <g fill="#2f9e41">
        <rect x="28" y="4" width="20" height="20" rx="2" />
        <rect x="52" y="4" width="20" height="20" rx="2" />
        <rect x="4" y="28" width="20" height="20" rx="2" />
        <rect x="28" y="28" width="20" height="20" rx="2" />
        <rect x="4" y="52" width="20" height="20" rx="2" />
        <rect x="28" y="52" width="20" height="20" rx="2" />
        <rect x="52" y="52" width="20" height="20" rx="2" />
        <rect x="4" y="76" width="20" height="20" rx="2" />
        <rect x="28" y="76" width="20" height="20" rx="2" />
      </g>
    </svg>
  );
}

// Marca do projeto: símbolo do IF + nome IFAI ("IF" em verde, "AI" em vermelho).
export default function MarcaIFAI({ tamanho = 'normal' }) {
  const grande = tamanho === 'grande';
  return (
    <span className="inline-flex items-center gap-2">
      <SimboloIF className={grande ? 'h-12 w-auto' : 'h-7 w-auto'} />
      <span className={grande ? 'text-[2.5rem] leading-none font-extrabold tracking-tight' : 'text-lg font-extrabold tracking-tight'}>
        <span className="text-if-verde">IF</span>
        <span className="text-if-vermelho">AI</span>
      </span>
    </span>
  );
}
