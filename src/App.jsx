import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { SquarePen } from 'lucide-react';
import Painel from './components/Painel';
import FormularioPergunta from './components/FormularioPergunta';
import Resposta from './components/Resposta';
import api from './services/api';
import './App.css';

export default function App() {
  // useState: Aula 08. Cada estado tem uma responsabilidade.
  const [pergunta, setPergunta] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  function mudarPergunta(evento) {
    setPergunta(evento.target.value);
  }

  // Envia um texto: usado pelo formulário e pelas sugestões da tela inicial.
  function enviar(texto) {
    if (carregando) return;

    setErro('');

    if (texto.trim() === '') {
      setErro('Digite uma pergunta antes de enviar.');
      return;
    }

    setPergunta(texto);
    setCarregando(true);

    // POST, Promises e response.data: Aula 09.
    api.post('/perguntar', { pergunta: texto.trim(), historico: mensagens.slice(-6) })
      .then((retorno) => {
        if (typeof retorno.data.resposta === 'string' && retorno.data.resposta.trim()) {
          setMensagens([...mensagens, { role: 'user', content: texto.trim() }, { role: 'assistant', content: retorno.data.resposta }]);
          setPergunta('');
        } else {
          setErro('A consulta não retornou uma resposta. Tente novamente.');
        }
        setCarregando(false);
      })
      .catch((falha) => {
        if (falha.response && falha.response.data && typeof falha.response.data.erro === 'string') {
          setErro(falha.response.data.erro);
        } else {
          setErro('Não foi possível conectar. Confira sua conexão e tente novamente.');
        }
        setCarregando(false);
      });
  }

  // O evento do formulário inicia a requisição; não precisamos de useEffect.
  function enviarPergunta(evento) {
    evento.preventDefault();
    enviar(pergunta);
  }

  function novaConversa() {
    setMensagens([]);
    setPergunta('');
    setErro('');
  }

  const status = import.meta.env.MODE === 'demonstracao'
    ? 'Demonstração: respostas simuladas'
    : mensagens.length > 0 ? 'OpenAI conectada' : 'OpenAI';

  const botaoNovaConversa = mensagens.length > 0 && (
    <button
      type="button"
      onClick={novaConversa}
      disabled={carregando}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-primary"
    >
      <SquarePen className="size-4" aria-hidden="true" />
      <span className="hidden sm:inline">Nova conversa</span>
      <span className="sr-only sm:hidden">Nova conversa</span>
    </button>
  );

  return (
    // MotionConfig: respeita quem pediu menos animação no sistema.
    <MotionConfig reducedMotion="user">
      <Painel titulo="Assistente de Estudos" subtitulo="IFSP Bragança Paulista · Front End AA04" status={status} acao={botaoNovaConversa}>
        <main className="flex flex-1 flex-col overflow-y-auto overscroll-contain" aria-busy={carregando}>
          <Resposta
            mensagens={mensagens}
            carregando={carregando}
            erro={erro}
            pergunta={pergunta}
            aoEscolherSugestao={enviar}
            rodape={
              <p className="mt-8 text-xs text-muted-foreground">
                Lembra as últimas 3 trocas · A conversa é apagada ao atualizar a página
                <br />
                Miguel Vaz de Souza · React + OpenAI
              </p>
            }
          />
        </main>
        <FormularioPergunta pergunta={pergunta} aoMudar={mudarPergunta} aoEnviar={enviarPergunta} carregando={carregando} />
      </Painel>
    </MotionConfig>
  );
}
