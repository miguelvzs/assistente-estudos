import axios from 'axios';

// Padrão da Aula 09: um cliente HTTP com endereço base.
// A chave da OpenAI não passa por este arquivo.
const api = axios.create({
  baseURL: '/api',
  timeout: 60000,
});

export default api;
