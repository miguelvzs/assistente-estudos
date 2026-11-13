import { AnimatePresence, motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from './ui/chat-bubble';

// Sugestões da tela inicial: clicar envia o texto como pergunta.
const sugestoes = [
  { titulo: 'Explique regra de três', detalhe: 'com um exemplo do dia a dia', texto: 'Explique regra de três com um exemplo do dia a dia.' },
  { titulo: 'Crie 3 exercícios', detalhe: 'de frações equivalentes, com gabarito', texto: 'Crie 3 exercícios de frações equivalentes, com gabarito.' },
  { titulo: 'Revise para a prova', detalhe: 'o que são props e state no React', texto: 'Revise para a prova: o que são props e state no React?' },
  { titulo: 'Organize meus estudos', detalhe: 'para uma prova daqui a 3 dias', texto: 'Monte um plano para estudar para uma prova daqui a 3 dias.' },
];

// Animação de entrada (Motion): surge de baixo, suavemente.
const entrada = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
};

// Ref de montagem: rola quando um novo trecho entra, não a cada tecla digitada.
function mostrarFinal(elemento) {
  if (elemento) elemento.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function AvatarAssistente() {
  return <ChatBubbleAvatar fallback={<Sparkles className="size-4" />} />;
}

export default function Resposta({ mensagens, carregando, erro, pergunta, aoEscolherSugestao, rodape }) {
  // Enquanto espera, a pergunta enviada já aparece como balão.
  // Mesma posição (key) que ela terá na lista: assim não pisca quando a resposta chega.
  const itens = carregando ? [...mensagens, { role: 'user', content: pergunta.trim() }] : mensagens;
  const vazio = itens.length === 0;

  const avisoErro = erro && (
    <motion.p
      {...entrada}
      role="alert"
      ref={mostrarFinal}
      className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-800"
    >
      {erro}
    </motion.p>
  );

  return (
    <div className="flex shrink-0 grow flex-col" role="log" aria-label="Conversa de estudos" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {vazio ? (
          <motion.div
            key="vazio"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto flex w-full max-w-3xl grow flex-col items-center justify-center px-4 py-10 text-center sm:px-6"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary" aria-hidden="true">
              <Sparkles className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">Vamos estudar?</h2>
            <p className="mt-2 max-w-md text-[15px] text-muted-foreground">
              Pergunte sobre qualquer matéria. Eu explico com passos curtos e exemplos.
            </p>
            <ul className="mt-8 grid w-full max-w-2xl gap-2.5 sm:grid-cols-2">
              {sugestoes.map((sugestao, indice) => (
                <motion.li
                  key={sugestao.titulo}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + indice * 0.05, duration: 0.25 }}
                  className={indice > 1 ? 'hidden sm:block' : ''}
                >
                  <button
                    type="button"
                    onClick={() => aoEscolherSugestao(sugestao.texto)}
                    className="w-full rounded-2xl border border-border px-4 py-3 text-left transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span className="block text-sm font-medium">{sugestao.titulo}</span>
                    <span className="block text-sm text-muted-foreground">{sugestao.detalhe}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
            {avisoErro && <div className="mt-6 w-full max-w-2xl">{avisoErro}</div>}
            {rodape}
          </motion.div>
        ) : (
          <motion.div
            key="conversa"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8"
          >
            {itens.map((mensagem, indice) => (
              <motion.div
                key={indice}
                {...entrada}
                ref={!carregando && indice === itens.length - 1 ? mostrarFinal : null}
                className="flex flex-col"
              >
                {mensagem.role === 'user' ? (
                  <ChatBubble variant="sent">
                    <ChatBubbleMessage variant="sent">{mensagem.content}</ChatBubbleMessage>
                  </ChatBubble>
                ) : (
                  <ChatBubble layout="ai">
                    <AvatarAssistente />
                    <ChatBubbleMessage layout="ai">{mensagem.content}</ChatBubbleMessage>
                  </ChatBubble>
                )}
              </motion.div>
            ))}

            {carregando && (
              <motion.div key="carregando" {...entrada} ref={mostrarFinal} aria-label="Preparando a resposta">
                <ChatBubble layout="ai">
                  <AvatarAssistente />
                  <ChatBubbleMessage layout="ai" isLoading />
                </ChatBubble>
              </motion.div>
            )}

            {avisoErro}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
