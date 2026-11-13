import { useState } from 'react';
import Resultado from './components/Resultado';
import { consultarSuap } from './services/suap';
import './App.css';

const consultas = [
  { id: 'disciplinas', titulo: 'Disciplinas' },
  { id: 'boletim', titulo: 'Notas e faltas' },
  { id: 'horarios', titulo: 'Horários' },
];

export default function App() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  function consultar(recurso) {
    if (carregando) return;
    setDados(null);
    setErro('');
    setCarregando(true);
    consultarSuap(recurso)
      .then((retorno) => {
        setDados(retorno.data);
        setCarregando(false);
      })
      .catch((falha) => {
        setErro(falha.response ? 'O serviço recusou a consulta. Confira o acesso autorizado.' : falha.message);
        setCarregando(false);
      });
  }

  return (
    <main>
      <header>
        <p className="versao">Versão básica · integração em preparação</p>
        <h1>Assistente acadêmico</h1>
        <p>Consulta de informações acadêmicas do SUAP.</p>
      </header>
      <p className="aviso">{import.meta.env.MODE === 'demonstracao'
        ? 'Demonstração local: dados fictícios. Nenhuma chamada ao SUAP.'
        : 'Acesso à API do IFSP ainda não confirmado. Esta base não consulta dados reais.'}</p>
      <div className="consultas" aria-label="Consultas disponíveis">
        {consultas.map((item) => (
          <button key={item.id} disabled={carregando} onClick={() => consultar(item.id)}>{item.titulo}</button>
        ))}
      </div>
      <Resultado dados={dados} carregando={carregando} erro={erro} />
      <footer>Miguel Vaz de Souza · IFSP Bragança Paulista · AA04</footer>
    </main>
  );
}
