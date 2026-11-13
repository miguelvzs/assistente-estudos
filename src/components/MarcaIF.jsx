// Símbolo oficial dos Institutos Federais (Manual da Marca 2015, Setec/MEC).
// Geometria e cores copiadas do arquivo em domínio público do Wikimedia Commons:
// https://commons.wikimedia.org/wiki/File:Instituto_Federal_Marca_2015.svg
function Simbolo() {
  return (
    <>
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
    </>
  );
}

export function SimboloIF({ className }) {
  return (
    <svg viewBox="0 0 76 100" className={className} aria-hidden="true" focusable="false">
      <Simbolo />
    </svg>
  );
}

// Marca IFAI montada na grade do Manual da Marca do IF:
// - módulo x = lado do quadrado (20); o manual pede no mínimo 50% de x entre símbolo e texto.
//   Como o nome IFAI tem 2,2x de altura, usamos 1x para dar respiro;
// - nome em Open Sans Bold, linhas de apoio em Open Sans Regular com altura de 75% de x;
// - cada linha de texto apoia a base numa linha de quadrados do símbolo.
// "IF" no verde e "AI" no vermelho da marca.
const fonte = '"Open Sans Variable", "Open Sans", sans-serif';

function Nome({ y, tamanho }) {
  return (
    <text x="87" y={y} fontFamily={fonte} fontSize={tamanho} fontWeight="700">
      <tspan fill="#2f9e41">IF</tspan>
      <tspan fill="#cd191e">AI</tspan>
    </text>
  );
}

export default function MarcaIFAI({ tamanho = 'normal', className }) {
  if (tamanho === 'grande') {
    // Versão completa: nome ocupa as duas primeiras linhas; apoio na 3ª e na 4ª.
    return (
      <svg viewBox="3 3 310 99" className={className} role="img" aria-label="IFAI, assistente de estudos, IFSP Bragança Paulista">
        <Simbolo />
        <Nome y="48" tamanho="61.6" />
        <text x="93" y="72" fontFamily={fonte} fontSize="21" fontWeight="400" fill="#16231a">Assistente de estudos</text>
        <text x="91" y="96" fontFamily={fonte} fontSize="21" fontWeight="400" fill="#5f6d63">IFSP Bragança Paulista</text>
      </svg>
    );
  }
  // Versão compacta (cabeçalho): nome centralizado nas duas linhas do meio.
  return (
    <svg viewBox="3 3 199 93" className={className} role="img" aria-label="IFAI">
      <Simbolo />
      <Nome y="72" tamanho="61.6" />
    </svg>
  );
}
