// Menu de seleção no estilo do seletor de modelo/esforço de chats de IA:
// botão-chip que abre um cartão flutuante com título, descrição e ✓ na opção escolhida.
// Acessível: role listbox/option, setas, Enter, Esc e clique fora fecham.
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function MenuSelecao({ id, rotulo, titulo, icone: Icone, valor, opcoes, aoMudar, desabilitado, curto }) {
  const [aberto, setAberto] = useState(false);
  const [posicao, setPosicao] = useState(null);
  const botao = useRef(null);
  const lista = useRef(null);
  const atual = opcoes.find((opcao) => opcao.id === valor) || opcoes[0];

  // Abre acima do botão; posição fixa para não ser cortado pela linha de chips que rola.
  function abrir() {
    const r = botao.current.getBoundingClientRect();
    const tela = Math.min(document.documentElement.clientWidth, window.visualViewport ? window.visualViewport.width : Infinity); // área visível real
    const largura = Math.min(280, tela - 32);
    setPosicao({ left: Math.max(8, Math.min(r.left, tela - largura - 24)), bottom: window.innerHeight - r.top + 8, width: largura });
    setAberto(true);
  }

  function fechar(focarBotao) {
    setAberto(false);
    // Devolve o foco depois do toque da tecla, para o Enter não "clicar" o botão e reabrir o menu.
    if (focarBotao) setTimeout(() => botao.current?.focus(), 0);
  }

  function escolher(opcao) {
    aoMudar(opcao.id);
    fechar(true);
  }

  // Ao abrir, foca a opção escolhida; clique fora ou rolagem fecha.
  useEffect(() => {
    if (!aberto) return undefined;
    lista.current?.querySelector('[aria-selected="true"]')?.focus();
    const fora = (evento) => {
      if (!lista.current?.contains(evento.target) && !botao.current?.contains(evento.target)) fechar(false);
    };
    const redimensionar = () => fechar(false);
    document.addEventListener('mousedown', fora);
    window.addEventListener('resize', redimensionar);
    return () => {
      document.removeEventListener('mousedown', fora);
      window.removeEventListener('resize', redimensionar);
    };
  }, [aberto]);

  function teclado(evento) {
    const itens = [...lista.current.querySelectorAll('[role="option"]')];
    const i = itens.indexOf(document.activeElement);
    if (evento.key === 'ArrowDown') { evento.preventDefault(); itens[(i + 1) % itens.length].focus(); }
    if (evento.key === 'ArrowUp') { evento.preventDefault(); itens[(i - 1 + itens.length) % itens.length].focus(); }
    if (evento.key === 'Escape') { evento.preventDefault(); fechar(true); }
    if (evento.key === 'Tab') fechar(false);
  }

  return (
    <>
      <button
        ref={botao}
        id={id}
        type="button"
        disabled={desabilitado}
        title={titulo}
        aria-label={rotulo + ': ' + atual.nome}
        aria-haspopup="listbox"
        aria-expanded={aberto}
        onClick={() => (aberto ? fechar(false) : abrir())}
        className={cn(
          'inline-flex shrink-0 items-center gap-1 rounded-full py-1.5 pr-2 pl-3 text-xs font-medium ring-1 transition-colors',
          'focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60',
          aberto ? 'bg-secondary text-foreground ring-primary/40' : 'bg-white text-muted-foreground ring-border hover:text-foreground'
        )}
      >
        {Icone && <Icone className="hidden size-3.5 sm:block" aria-hidden="true" />}
        <span>{curto ? curto(atual) : atual.nome}</span>
        <ChevronDown className={cn('size-3.5 transition-transform', aberto && 'rotate-180')} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {aberto && posicao && (
          <motion.ul
            ref={lista}
            role="listbox"
            aria-label={rotulo}
            onKeyDown={teclado}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            style={{ position: 'fixed', left: posicao.left, bottom: posicao.bottom, width: posicao.width, transformOrigin: 'bottom left' }}
            className="z-40 max-h-[60dvh] overflow-y-auto rounded-2xl border border-border bg-white p-1.5 shadow-[0_12px_40px_rgb(0_0_0/0.12)]"
          >
            <li className="px-3 pt-1.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground" role="presentation">
              {rotulo}
            </li>
            {opcoes.map((opcao) => {
              const escolhida = opcao.id === valor;
              return (
                <li
                  key={opcao.id || 'vazio'}
                  role="option"
                  aria-selected={escolhida}
                  tabIndex={-1}
                  onClick={() => escolher(opcao)}
                  onKeyDown={(evento) => {
                    if (evento.key === 'Enter' || evento.key === ' ') { evento.preventDefault(); escolher(opcao); }
                  }}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 outline-none transition-colors hover:bg-secondary focus:bg-secondary"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-foreground">{opcao.nome}</span>
                    {opcao.descricao && <span className="block text-xs leading-4 text-muted-foreground">{opcao.descricao}</span>}
                  </span>
                  <Check className={cn('size-4 shrink-0 text-primary', escolhida ? 'opacity-100' : 'opacity-0')} aria-hidden="true" />
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}
