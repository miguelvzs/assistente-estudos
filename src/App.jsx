import { useState } from 'react';
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

  // O evento do formulário inicia a requisição; não precisamos de useEffect.
  function enviarPergunta(evento) {
    evento.preventDefault();

    if (carregando) return;

    setErro('');

    if (pergunta.trim() === '') {
      setErro('Digite uma pergunta antes de enviar.');
      return;
    }

    setCarregando(true);

    // POST, Promises e response.data: Aula 09.
    api.post('/perguntar', { pergunta: pergunta.trim(), historico: mensagens.slice(-6) })
      .then((retorno) => {
        if (typeof retorno.data.resposta === 'string' && retorno.data.resposta.trim()) {
          setMensagens([...mensagens, { role: 'user', content: pergunta.trim() }, { role: 'assistant', content: retorno.data.resposta }]);
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

  return (
    <main className="pagina">
      <header className="cabecalho">
        <h1>Assistente de Estudos</h1>
      </header>

      <Painel titulo="Conversa" imagem="/assistente.png" status={import.meta.env.MODE === 'demonstracao' ? 'Demonstração: respostas simuladas' : mensagens.length > 0 ? 'Conexão com a OpenAI confirmada' : 'OpenAI: aguardando a primeira resposta'}>
        <div aria-live="polite" aria-busy={carregando}>
          <Resposta mensagens={mensagens} carregando={carregando} erro={erro} />
        </div>
        <FormularioPergunta pergunta={pergunta} aoMudar={mudarPergunta} aoEnviar={enviarPergunta} carregando={carregando} />
      </Painel>
      <p className="nota-conversa">A IA considera as últimas 3 trocas. Ao atualizar a página, a conversa é apagada.</p>

      <footer>
        <p>Miguel Vaz de Souza · IFSP Bragança Paulista</p>
        <p>Desenvolvimento Web Front End · AA04 · React + OpenAI</p>
      </footer>
    </main>
  );
}






