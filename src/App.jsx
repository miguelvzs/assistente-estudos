import { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { Presentation, SquarePen } from 'lucide-react';
import Painel from './components/Painel';
import FormularioPergunta from './components/FormularioPergunta';
import Resposta from './components/Resposta';
import GuiaApresentacao from './components/GuiaApresentacao';
import api from './services/api';
import './App.css';

export default function App() {
  // useState: Aula 08. Cada estado tem uma responsabilidade.
  const [pergunta, setPergunta] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  // Estado só de interface: abre e fecha o guia de apresentação.
  const [guiaAberto, setGuiaAberto] = useState(false);
  // Matéria escolhida ('' = todas): muda as sugestões e o contexto enviado ao servidor.
  const [materia, setMateria] = useState('');
  // Esforço de raciocínio do modelo: 'low', 'medium' ou 'high'.
  const [esforco, setEsforco] = useState('low');
  // Modo treino: a IA propõe exercícios e corrige as respostas do aluno.
  const [treino, setTreino] = useState(false);

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
    api.post('/perguntar', { pergunta: texto.trim(), historico: mensagens.slice(-6), materia, esforco, modo: treino ? 'treino' : '' })
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

  // Plano de estudo da agenda: escolhe a matéria da avaliação e envia o pedido.
  function pedirPlano(idMateria, texto) {
    setMateria(idMateria);
    enviar(texto);
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

  const estiloBotao = 'inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-primary';

  const acoes = (
    <>
      {mensagens.length > 0 && (
        <button type="button" onClick={novaConversa} disabled={carregando} className={estiloBotao}>
          <SquarePen className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Nova conversa</span>
          <span className="sr-only sm:hidden">Nova conversa</span>
        </button>
      )}
      <button type="button" onClick={() => setGuiaAberto(true)} className={estiloBotao + ' border border-border'}>
        <Presentation className="size-4 text-if-vermelho" aria-hidden="true" />
        <span className="hidden sm:inline">Apresentação</span>
        <span className="sr-only sm:hidden">Apresentação</span>
      </button>
    </>
  );

  return (
    // MotionConfig: respeita quem pediu menos animação no sistema.
    <MotionConfig reducedMotion="user">
      <Painel titulo="IFAI, assistente de estudos" status={status} acoes={acoes}>
        <main className="flex flex-1 flex-col overflow-y-auto overscroll-contain" aria-busy={carregando}>
          <Resposta
            mensagens={mensagens}
            carregando={carregando}
            erro={erro}
            pergunta={pergunta}
            aoEscolherSugestao={enviar}
            materia={materia}
            aoMudarMateria={setMateria}
            aoPedirPlano={pedirPlano}
            rodape={
              <p className="mt-8 text-xs leading-5 text-muted-foreground">
                A conversa lembra as últimas 3 trocas e é apagada ao atualizar a página.
                <br />
                Limite de 50 consultas por dia, somando todos os usuários.
                <br />
                Projeto acadêmico de Miguel Vaz de Souza (Front End, AA04). Não é um serviço oficial do IF.
              </p>
            }
          />
        </main>
        <FormularioPergunta pergunta={pergunta} aoMudar={mudarPergunta} aoEnviar={enviarPergunta} carregando={carregando} materia={materia} aoMudarMateria={setMateria} esforco={esforco} aoMudarEsforco={setEsforco} treino={treino} aoMudarTreino={setTreino} />
      </Painel>
      <AnimatePresence>
        {guiaAberto && <GuiaApresentacao key="guia" aoFechar={() => setGuiaAberto(false)} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
