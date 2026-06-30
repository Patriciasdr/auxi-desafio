export type StatusIdentificacao = 'ACESSO_DIRETO' | 'BLOQUEIO';

export interface ResultadoIdentificacao {
  status: StatusIdentificacao;
  nome?: string;       
  cpfMascarado?: string;
}

export interface Condominio {
  id: string;
  nome: string;
  endereco: string;
  papel: string;
}

const baseClientes: Record<string, { nome: string }> = {
  '11111111111': { nome: 'Patricia Souza' },
};

function delay<T>(valor: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(valor), ms));
}

export const authService = {
  async identificarPorCpf(cpfNumeros: string): Promise<ResultadoIdentificacao> {
    const cliente = baseClientes[cpfNumeros];
    
    if (cliente) {
      const cpfMascarado = '•••.•••.' + cpfNumeros.slice(6, 9) + '-' + cpfNumeros.slice(9);
      
      if (cpfNumeros === '22222222222') {
        return delay({ status: 'BLOQUEIO', nome: cliente.nome });
      }
      

      return delay({ status: 'ACESSO_DIRETO', nome: cliente.nome, cpfMascarado });
    }
    
   
    return delay({ status: 'BLOQUEIO' });
  },

  async autenticar(_cpf: string, senha: string): Promise<boolean> {
    return delay(senha.trim().length > 0);
  },

  
  async listarCondominios(): Promise<Condominio[]> {
    return delay([
      { id: 'c1', nome: 'Residencial Jardim das Aces', endereco: 'Av. Ipiranga, 1200 — Porto Alegre/RS', papel: 'Síndico' },
      { id: 'c2', nome: 'Edifício Mont Blanc', endereco: 'R. dos Andradas, 455 — Porto Alegre/RS', papel: 'Proprietário' },
      { id: 'c3', nome: 'Condomínio Vista Verde', endereco: 'Av. Carlos Gomes, 890 — Porto Alegre/RS', papel: 'Morador' },
    ]);
  },
};