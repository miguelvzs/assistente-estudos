import { useState } from 'react';
import Painel from './components/Painel';
import FormularioPergunta from './components/FormularioPergunta';
import Resposta from './components/Resposta';
import api from './services/api';
import './App.css';

export default function App() {
  // useState: Aula 08. Cada estado tem uma responsabilidade.
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
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
    setResposta('');

    if (pergunta.trim() === '') {
      setErro('Digite uma pergunta antes de enviar.');
      return;
    }

    setCarregando(true);

    // POST, Promises e response.data: Aula 09.
    api.post('/perguntar', { pergunta: pergunta.trim() })
      .then((retorno) => {
        if (typeof retorno.data.resposta === 'string' && retorno.data.resposta.trim()) {
          setResposta(retorno.data.resposta);
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
        <p className="disciplina">DESENVOLVIMENTO WEB FRONT END · AA04</p>
        <h1>Assistente de Estudos</h1>
        <p className="introducao">Uma dúvida de cada vez. Receba uma explicação curta e um exemplo para estudar.</p>
      </header>

      <Painel titulo="O que você quer entender?">
        <FormularioPergunta
          pergunta={pergunta}
          aoMudar={mudarPergunta}
          aoEnviar={enviarPergunta}
          carregando={carregando}
        />
      </Painel>

      <Painel titulo="Resposta">
        <div aria-live="polite" aria-busy={carregando}>
          <Resposta resposta={resposta} carregando={carregando} erro={erro} />
        </div>
      </Painel>

      <footer>Miguel Vaz de Souza · IFSP Bragança Paulista · React + OpenAI</footer>
    </main>
  );
}
