import axios from 'axios';
import { enderecosSuap } from '../config/suap';

export function consultarSuap(recurso) {
  const demonstracao = import.meta.env.MODE === 'demonstracao';
  const endereco = demonstracao ? `/exemplos/${recurso}.json` : enderecosSuap[recurso];
  if (!endereco) return Promise.reject(new Error('Integração com o SUAP do IFSP ainda não configurada.'));
  // A versão real só será ligada após validar autenticação, CORS e contrato.
  return axios.get(endereco, { timeout: 15000 });
}
