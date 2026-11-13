import { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { SimboloIF } from './MarcaIF';

// Guia de apresentação: painel lateral aberto pelo botão "Apresentação" do cabeçalho.
// Resume docs/EXPLICACAO.md e docs/TECNOLOGIAS.md.

const abas = [
  { id: 'fluxo', nome: 'Fluxo' },
  { id: 'react', nome: 'React' },
  { id: 'api', nome: 'API' },
  { id: 'servidor', nome: 'Servidor' },
  { id: 'interface', nome: 'Interface' },
  { id: 'tecnologias', nome: 'Tecnologias' },
  { id: 'perguntas', nome: 'Perguntas' },
];

function Titulo({ children }) {
  return <h3 className="mt-6 mb-2 text-sm font-semibold text-foreground first:mt-0">{children}</h3>;
}

function Fala({ children }) {
  return <blockquote className="my-3 rounded-xl border-l-4 border-if-verde bg-secondary px-4 py-3 text-sm italic leading-6">{children}</blockquote>;
}

function Codigo({ children }) {
  return <pre className="my-3 overflow-x-auto rounded-xl bg-foreground px-4 py-3 text-[13px] leading-6 text-white"><code>{children}</code></pre>;
}

function Tabela({ colunas, linhas }) {
  return (
    <div className="my-3 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
          <tr>{colunas.map((coluna) => <th key={coluna} className="px-3 py-2 font-semibold">{coluna}</th>)}</tr>
        </thead>
        <tbody>
          {linhas.map((linha, indice) => (
            <tr key={indice} className="border-t border-border align-top">
              {linha.map((celula, i) => <td key={i} className="px-3 py-2 leading-6">{celula}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Link({ href, children }) {
  return <a href={href} target="_blank" rel="noreferrer" className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary">{children}</a>;
}

const c = (texto) => <code className="rounded bg-secondary px-1 py-0.5 text-[13px]">{texto}</code>;

const conteudo = {
  fluxo: (
    <>
      <Titulo>Da pergunta à resposta</Titulo>
      <ol className="space-y-2 text-sm leading-6">
        {[
          ['Digitar', <>onChange chama {c('mudarPergunta')} → {c('setPergunta')} guarda o texto.</>],
          ['Enviar', <>Enter ou botão → {c('onSubmit')} → {c('enviarPergunta')} → {c('preventDefault()')} → {c('enviar(pergunta)')}.</>],
          ['Validar', <>Texto vazio vira erro; senão {c('setCarregando(true)')}.</>],
          ['POST', <>Axios envia {c('{ pergunta, historico, materia }')} para {c('/api/perguntar')}.</>],
          ['Servidor', 'A função na Vercel valida, monta as instruções com o contexto da matéria, reserva 1 das 50 consultas do dia e chama a OpenAI com a chave guardada no servidor.'],
          ['Resposta', <>A função devolve só {c('{ resposta }')} ao navegador.</>],
          ['Atualizar', <>{c('then')}: {c('setMensagens')} acrescenta a troca e limpa o campo. {c('catch')}: {c('setErro')}. Nos dois: {c('setCarregando(false)')}.</>],
          ['Mostrar', 'O React redesenha: balão da pergunta e resposta surgindo com animação.'],
        ].map(([etapa, texto], indice) => (
          <li key={etapa} className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-white">{indice + 1}</span>
            <span><strong>{etapa}.</strong> {texto}</span>
          </li>
        ))}
      </ol>
      <Fala>“Há duas chamadas HTTP: o navegador chama a nossa função; a nossa função chama a OpenAI.”</Fala>
    </>
  ),
  react: (
    <>
      <Titulo>Estados (useState, Aula 08)</Titulo>
      <Tabela
        colunas={['Estado', 'Guarda']}
        linhas={[
          [c('pergunta'), 'Texto digitado'],
          [c('mensagens'), 'Lista de perguntas e respostas'],
          [c('carregando'), 'Se há consulta em andamento'],
          [c('erro'), 'Mensagem de falha'],
          [c('materia'), 'Matéria escolhida: muda sugestões e contexto da IA'],
          [c('guiaAberto'), 'Só interface: abre e fecha este guia'],
        ]}
      />
      <Codigo>{`const [pergunta, setPergunta] = useState('');`}</Codigo>
      <p className="text-sm leading-6">{c('pergunta')} é o valor atual; {c('setPergunta')} atualiza e faz o React redesenhar a tela.</p>
      <Titulo>Componentes</Titulo>
      <Tabela
        colunas={['Arquivo', 'Papel']}
        linhas={[
          ['App.jsx', 'Coordena estados, envio e requisição'],
          ['Painel.jsx', 'Cabeçalho + children (Aulas 04 e 05)'],
          ['Resposta.jsx', 'Tela inicial, mensagens (map/key), espera e erro'],
          ['FormularioPergunta.jsx', 'Formulário com o campo da Kokonut'],
          ['GuiaApresentacao.jsx', 'Este guia'],
          ['MarcaIF.jsx', 'Símbolo do IF e nome IFAI'],
          ['components/ui/', 'Componentes do 21st.dev adaptados'],
        ]}
      />
      <Titulo>Props, children e eventos</Titulo>
      <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
        <li><strong>Props</strong>: valores e funções que o pai passa ao filho. Ex.: {c('<FormularioPergunta pergunta={pergunta} aoMudar={mudarPergunta} />')}.</li>
        <li><strong>children</strong>: o que fica entre {c('<Painel>')} e {c('</Painel>')}.</li>
        <li><strong>onChange</strong> acompanha a digitação; <strong>onSubmit</strong> inicia o envio; {c('preventDefault()')} evita recarregar a página.</li>
        <li><strong>map + key</strong>: cada mensagem da lista vira um balão.</li>
        <li><strong>Sem useEffect no App</strong>: a consulta acontece por evento, não ao abrir a página.</li>
      </ul>
    </>
  ),
  api: (
    <>
      <Titulo>A requisição (Aula 09)</Titulo>
      <Codigo>{`api.post('/perguntar', {
  pergunta: texto.trim(),
  historico: mensagens.slice(-6),
  materia
})
  .then((retorno) => { /* retorno.data.resposta */ })
  .catch((falha) => { /* falha.response.data.erro */ });`}</Codigo>
      <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
        <li>{c('post')}: envia dados no corpo da requisição, em JSON.</li>
        <li>{c('trim()')}: tira espaços do começo e do fim.</li>
        <li>{c('slice(-6)')}: últimas 6 mensagens = 3 perguntas + 3 respostas.</li>
        <li>{c('materia')}: id da matéria escolhida ({c("'bd1'")}, {c("'poo'")}...) ou vazio para todas.</li>
        <li>{c('services/api.js')}: {c('axios.create')} com base {c('/api')} e tempo limite de 60 s.</li>
        <li>É assíncrono: a Promise termina depois; {c('then')} trata sucesso e {c('catch')} trata falha.</li>
        <li>{c('retorno.data')}: o Axios já converte o JSON da resposta.</li>
      </ul>
      <Fala>“Uso POST porque envio uma pergunta no corpo. A resposta não chega na hora: por isso o then e o catch.”</Fala>
    </>
  ),
  servidor: (
    <>
      <Titulo>Por que existe uma função de servidor</Titulo>
      <p className="text-sm leading-6">A chave da OpenAI não pode ficar no React: todo código do navegador pode ser inspecionado. Ela fica só no ambiente da Vercel, em {c('api/perguntar.js')}.</p>
      <Titulo>O que a função faz</Titulo>
      <ol className="list-decimal space-y-1 pl-5 text-sm leading-6">
        <li>Aceita só POST, do próprio site, em JSON.</li>
        <li>Valida a pergunta: texto, não vazia, até 2000 caracteres.</li>
        <li>Monta as instruções com o semestre de ADS e, se houver matéria, os temas e as ferramentas dela (ex.: MySQL em BD1, Python em POO). O id só vale se estiver na lista de {c('conteudo/semestre.js')}.</li>
        <li>Reserva 1 das 50 consultas do dia (contador privado no Vercel Blob; renova à meia-noite de Brasília).</li>
        <li>Chama a OpenAI (modelo {c('gpt-6-luna')}, até 600 tokens, tempo limite de 45 s).</li>
        <li>Devolve só o texto em {c('{ resposta }')}, ou um erro curto.</li>
      </ol>
      <Tabela
        colunas={['Código', 'Quando']}
        linhas={[['200', 'Resposta pronta'], ['400', 'Pergunta inválida'], ['429', 'Limite de 50/dia atingido'], ['502', 'Falha da OpenAI'], ['503', 'Chave ou contador indisponível'], ['504', 'Demorou demais']]}
      />
      <Fala>“A função de servidor e o limite diário foram feitos com pesquisa e assistência de IA. Não fazem parte das aulas de React. Estudei como funcionam para explicar a integração.”</Fala>
    </>
  ),
  interface: (
    <>
      <Titulo>Componentes prontos (21st.dev)</Titulo>
      <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
        <li><strong>Chat Bubble</strong>, de Jakob Hoeg (MIT): balão verde da pergunta ({c('variant="sent"')}) e resposta em largura total ({c('layout="ai"')}), com os três pontos de espera.</li>
        <li><strong>AI Input With Loading</strong>, da Kokonut UI (MIT): campo que cresce com o texto, botão dentro do campo e quadrado girando na espera.</li>
        <li>Adaptei: TypeScript → JSX, textos em português e ligação com o estado e a API reais (o original simulava a espera com temporizador).</li>
      </ul>
      <Fala>“Usei componentes abertos do 21st.dev como base e adaptei ao projeto. O controle das mensagens e a chamada à API continuam no App.”</Fala>
      <Titulo>Estilo, animação e marca</Titulo>
      <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
        <li><strong>Tailwind CSS</strong>: classes de estilo direto no JSX; necessário porque os componentes vêm assim.</li>
        <li><strong>Motion</strong>: {c('initial')} (começo) e {c('animate')} (fim) nas mensagens; {c('whileTap')} no botão; desliga se o sistema pede menos movimento.</li>
        <li><strong>Open Sans</strong>: fonte oficial da marca do IF (Manual da Marca 2015), servida pelo próprio site. <strong>Lucide</strong>: ícones.</li>
        <li><strong>Paleta do IF</strong>: verde {c('#2f9e41')} e vermelho {c('#cd191e')}. Botões e balões usam verde mais escuro ({c('#1f7a33')}) para o texto branco ter contraste suficiente.</li>
        <li><strong>IFAI</strong>: símbolo oficial do IF (domínio público, Setec/MEC) + “AI”.</li>
      </ul>
      <Titulo>Responsividade</Titulo>
      <p className="text-sm leading-6">Classes com {c('sm:')} valem a partir de 640px. No celular: duas sugestões, ícones sem texto, balões até 85% da largura e espaço para a barra do iPhone. Só a conversa rola; cabeçalho e campo ficam fixos.</p>
    </>
  ),
  tecnologias: (
    <>
      <Titulo>Tecnologias do projeto</Titulo>
      <Tabela
        colunas={['Tecnologia', 'Uso']}
        linhas={[
          [<Link href="https://react.dev">React 19 + ReactDOM</Link>, 'Interface, estados e componentes'],
          [<Link href="https://vite.dev">Vite 8</Link>, 'Ambiente de desenvolvimento e build'],
          [<Link href="https://axios-http.com">Axios</Link>, 'Requisições HTTP (navegador e servidor)'],
          [<Link href="https://developers.openai.com/api/reference/resources/responses/methods/create">OpenAI Responses API</Link>, 'Gera as respostas (gpt-6-luna)'],
          [<Link href="https://vercel.com/docs/functions/runtimes/node-js">Vercel Functions</Link>, 'Função de servidor que protege a chave'],
          [<Link href="https://vercel.com/docs/vercel-blob">Vercel Blob</Link>, 'Contador privado das 50 consultas/dia'],
          [<Link href="https://vercel.com">Vercel</Link>, 'Hospedagem e deploy automático da main'],
          [<Link href="https://nodejs.org/api/test.html">Node.js + node:test</Link>, '19 testes automáticos do servidor'],
          [<Link href="https://github.com/miguelvzs/assistente-estudos">GitHub + Actions</Link>, 'Código e verificação (testes + build) a cada envio'],
          [<Link href="https://tailwindcss.com">Tailwind CSS 4</Link>, 'Estilo'],
          [<Link href="https://motion.dev">Motion</Link>, 'Animações'],
          [<Link href="https://lucide.dev">Lucide</Link>, 'Ícones'],
          [<Link href="https://fontsource.org/fonts/open-sans">Open Sans</Link>, <>Fonte oficial do IF (<Link href="https://web.archive.org/web/20190102031956/http://redefederal.mec.gov.br/images/pdf/manual.pdf">Manual da Marca</Link>), via Fontsource</>],
        ]}
      />
      <Titulo>Sites de componentes e recursos</Titulo>
      <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
        <li><Link href="https://21st.dev">21st.dev</Link>: biblioteca de componentes React da comunidade.</li>
        <li><Link href="https://21st.dev/@jakobhoeg/components/chat-bubble">Chat Bubble</Link>, de Jakob Hoeg, do projeto <Link href="https://github.com/jakobhoeg/shadcn-chat">shadcn-chat</Link> (MIT).</li>
        <li><Link href="https://21st.dev/@kokonutd/components/ai-input-with-loading">AI Input With Loading</Link>, da <Link href="https://kokonutui.com">Kokonut UI</Link> (MIT).</li>
        <li><Link href="https://commons.wikimedia.org/wiki/File:Instituto_Federal_Marca_2015.svg">Símbolo do IF</Link>: Wikimedia Commons, Manual da Marca 2015 (Setec/MEC), domínio público.</li>
      </ul>
      <Titulo>Assistência de IA</Titulo>
      <p className="text-sm leading-6">Servidor, limite diário, adaptação dos componentes e documentação foram feitos com pesquisa e assistência de IA. Lista completa em {c('docs/TECNOLOGIAS.md')}.</p>
    </>
  ),
  perguntas: (
    <Tabela
      colunas={['Pergunta', 'Resposta curta']}
      linhas={[
        ['Onde a API é consumida?', 'Duas chamadas: React → nossa função; função → OpenAI.'],
        ['Por que Axios?', 'Visto na Aula 09; facilita POST, data e erros.'],
        ['Por que POST?', 'Envio a pergunta no corpo para gerar uma resposta.'],
        ['Props × state?', 'State é do componente; props vêm do pai.'],
        ['O que é children?', 'O conteúdo entre as tags do componente.'],
        ['Por que preventDefault?', 'Evita o envio tradicional que recarrega a página.'],
        ['Por que não useEffect?', 'A consulta é disparada por evento, não ao abrir.'],
        ['Onde está a chave?', 'Só no servidor da Vercel; nunca no navegador, GitHub ou ZIP.'],
        ['Um .env no React esconderia?', 'Não. Tudo que vai ao navegador pode ser lido.'],
        ['Guarda a conversa?', 'Só na memória da página; atualizar apaga.'],
        ['A IA conhece as aulas?', 'Não. Não conectamos Moodle nem SUAP.'],
        ['A resposta é sempre certa?', 'Não. Conferir com o material.'],
        ['Você fez os componentes?', 'Não. Vieram do 21st.dev (MIT) e eu adaptei.'],
        ['O que é Tailwind?', 'Classes CSS prontas no JSX; os componentes usam.'],
        ['O que o Motion faz?', 'Anima entrada das mensagens e toque no botão.'],
        ['Por que o campo cresce?', 'Um hook mede o scrollHeight do texto e ajusta a altura.'],
        ['Como a IA sabe a matéria?', 'O App manda o id da matéria; o servidor troca pelo contexto da lista. O navegador não escreve as instruções.'],
        ['De onde vieram os temas?', 'Dos títulos das aulas e atividades do Moodle de cada disciplina.'],
      ]}
    />
  ),
};

export default function GuiaApresentacao({ aoFechar }) {
  const [aba, setAba] = useState('fluxo');

  return (
    <div className="fixed inset-0 z-50" onKeyDown={(evento) => evento.key === 'Escape' && aoFechar()}>
      <motion.div
        className="absolute inset-0 bg-foreground/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={aoFechar}
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-guia"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
        className="absolute inset-y-0 right-0 flex w-full flex-col bg-white shadow-2xl sm:max-w-xl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-border px-5 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <SimboloIF className="h-9 w-auto" />
            <div>
              <h2 id="titulo-guia" className="text-base font-semibold">Guia da apresentação</h2>
              <p className="text-xs text-muted-foreground">Fluxo, código, tecnologias e perguntas</p>
            </div>
          </div>
          <button
            type="button"
            onClick={aoFechar}
            autoFocus
            aria-label="Fechar guia"
            className="grid size-9 place-items-center rounded-lg hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>

        <nav className="flex gap-1.5 overflow-x-auto border-b border-border px-5 py-2.5 [scrollbar-width:none]" aria-label="Seções do guia">
          {abas.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setAba(item.id)}
              aria-current={aba === item.id ? 'page' : undefined}
              className={
                'shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary ' +
                (aba === item.id ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-secondary')
              }
            >
              {item.nome}
            </button>
          ))}
        </nav>

        <motion.div
          key={aba}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 overflow-y-auto px-5 py-5 pb-[max(env(safe-area-inset-bottom),1.25rem)]"
        >
          {conteudo[aba]}
          <p className="mt-8 border-t border-border pt-4 text-xs text-muted-foreground">
            Explicação completa no GitHub: <Link href="https://github.com/miguelvzs/assistente-estudos/blob/main/docs/EXPLICACAO.md">EXPLICACAO.md</Link> e <Link href="https://github.com/miguelvzs/assistente-estudos/blob/main/docs/TECNOLOGIAS.md">TECNOLOGIAS.md</Link>
          </p>
        </motion.div>
      </motion.aside>
    </div>
  );
}
