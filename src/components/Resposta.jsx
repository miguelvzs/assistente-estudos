import { AnimatePresence, motion } from 'motion/react';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from './ui/chat-bubble';
import MarcaIFAI, { SimboloIF } from './MarcaIF';
import Sugestoes from './Sugestoes';

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
  return <ChatBubbleAvatar fallback={<SimboloIF className="h-4 w-auto" />} />;
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
            className="mx-auto flex w-full max-w-3xl grow flex-col items-center justify-center px-4 py-8 text-center sm:px-6"
          >
            <MarcaIFAI tamanho="grande" />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">Vamos estudar?</h2>
            <p className="mt-2 max-w-md text-[15px] text-muted-foreground">
              Escolha uma matéria do semestre ou pergunte o que quiser. Eu explico com passos curtos e exemplos.
            </p>
            <Sugestoes aoEscolher={aoEscolherSugestao} />
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
