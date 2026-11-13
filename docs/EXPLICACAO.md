# Explicação completa da base SUAP

## Ideia
O aluno clica em uma opção e o React mostra o resultado de uma consulta GET.
O código atual permite estudar esse fluxo com JSON fictício local. Ainda não tem
acesso real ao SUAP do IFSP. Não há OpenAI nem geração de resposta.

## App.jsx: cada bloco
Imports trazem useState, componente Resultado, função HTTP e CSS. A lista consultas
contém três identificadores internos e os textos dos botões; não são rotas oficiais.
Os três estados são dados (null inicialmente), carregando (false) e erro (texto vazio).

consultar recebe o identificador escolhido. Se já carrega, retorna para evitar novo
clique. Limpa dado/erro anteriores e liga carregando. consultarSuap devolve Promise:
then recebe retorno.data, guarda o objeto e libera os botões; catch guarda mensagem
legível e também libera. Não há chamada automática nem useEffect.

O JSX mostra título e aviso de demonstração ou integração pendente. map cria os
três botões; key usa o identificador estável. onClick recebe uma função que chama
consultar com aquele identificador. disabled bloqueia os botões durante a consulta.
Resultado recebe os três estados por props; o rodapé identifica o trabalho.

## services/suap.js
Importa Axios e a configuração. import.meta.env.MODE informa o modo do Vite; não
é um hook. Em demonstracao, escolhe um arquivo da pasta exemplos. No modo normal,
consulta o endereço configurado para o recurso. Sem endereço, Promise.reject gera
o erro de integração pendente sem enviar requisição. Caso haja endereço, axios.get
faz GET com timeout de 15 segundos. O módulo não guarda tokens nem senhas.

Nenhum endpoint oficial foi presumido. Preencher a configuração não basta para
resolver autenticação ou CORS; isso exige a documentação do IFSP antes de ativar.

## config/suap.js
Exporta um objeto com três endereços vazios. É configuração pública incluída no
frontend. Só deve receber URLs oficiais confirmadas, nunca segredo. Os nomes são
chaves internas da interface, não nomes de endpoints comprovados.

## Resultado.jsx
Recebe dados, carregando e erro. Condicionais mostram espera, erro ou orientação
inicial. dados diferente de null é convertido por JSON.stringify(dados, null, 2)
em texto formatado com dois espaços e exibido em pre. React trata esse valor como
texto, sem executar HTML. O formato genérico evita inventar um esquema oficial.
aria-live anuncia atualizações; aria-busy indica consulta; role alert marca o erro.

## App.css
box-sizing inclui bordas e padding na largura. main limita largura e centraliza.
.consultas usa flex e permite quebra; media query empilha os botões no celular.
:focus-visible desenha contorno para teclado; :disabled indica espera. pre preserva
espaços e quebra texto comprido. .erro distingue falha por texto e cor.

## Arquivos de apoio
| Arquivo | Papel |
|---|---|
| index.html | Documento inicial com root e título |
| src/main.jsx | Monta App com createRoot e StrictMode |
| vite.config.js | Liga plugin React; não contém adaptador de servidor |
| public/exemplos/*.json | Três respostas fictícias, identificadas como exemplos |
| package.json | Dependências e comandos dev/demo/build/preview |
| package-lock.json | Versões exatas para npm ci |
| .github/workflows/verificar.yml | Instala e compila a branch no GitHub |
| vercel.json | Configuração estática; deploy desta branch desabilitado |
| .gitignore | Exclui dependências, builds, segredos e configuração local |
| AGENTS.md e CLAUDE.md | Orientações de manutenção; não executam no app |
| SEGURANCA.md | Referência genérica; ver limites do escopo desta base |
| PRODUCT.md, ARCHITECTURE.md, DESIGN.md | Objetivo, fluxo e interface |
| docs/specs/06-suap-basico.md | Requisitos e pendências da versão |
| docs/COMMITS.md, docs/DOCUMENTACAO.md | Regras de versionamento e documentação |

## GET, JSON e Promise
GET solicita informação, sem enviar uma pergunta à IA. JSON é o formato dos dados.
Promise representa uma resposta futura; then trata sucesso e catch trata falha.
Axios converte JSON em retorno.data. useState atualiza a tela após a resposta.

## O que não podemos afirmar
O exemplo local não demonstra login SUAP, CORS liberado, dados acadêmicos reais ou
permissão institucional. Não existe ainda garantia de que a solução final dispensará
servidor: depende da autenticação oferecida pelo IFSP. Assistência de IA deve ser declarada.
