import { supabase } from './supabaseClient'; // 💡 Conexão com o banco

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

export const authService = {
  async identificarPorCpf(cpfNumeros: string): Promise<ResultadoIdentificacao> {
    try {
      const { data: cliente, error } = await supabase
        .from('usuarios')
        .select('nome')
        .eq('cpf', cpfNumeros)
        .single();

      if (error || !cliente) {
        return { status: 'BLOQUEIO' };
      }

      const cpfMascarado =
        '•••.•••.' + cpfNumeros.slice(6, 9) + '-' + cpfNumeros.slice(9);
        
      return { status: 'ACESSO_DIRETO', nome: cliente.nome, cpfMascarado };
      
    } catch (err) {
      console.error('Erro na identificação:', err);
      return { status: 'BLOQUEIO' };
    }
  },

  async autenticar(cpfNumeros: string, senhaDigitada: string): Promise<boolean> {
    try {

      const { data, error } = await supabase
        .from('usuarios')
        .select('cpf') 
        .eq('cpf', cpfNumeros)
        .eq('senha', senhaDigitada)
        .single();

      if (error || !data) {
        return false; 
      }

      return true;
      
    } catch (err) {
      console.error('Erro na autenticação:', err);
      return false;
    }
  },

  async listarCondominios(cpfUsuario: string): Promise<Condominio[]> {
    try {
      const { data, error } = await supabase
        .from('vinculos')
        .select(`
          papel,
          condominios (
            id,
            nome,
            endereco
          )
        `)
        .eq('usuario_cpf', cpfUsuario);

      if (error) {
        console.error('Erro ao listar condominios relacionais:', error);
        return [];
      }

      if (!data) return [];

      return data.map((item: any) => ({
        id: String(item.condominios.id),
        nome: item.condominios.nome,
        endereco: item.condominios.endereco,
        papel: item.papel
      }));
      
    } catch (err) {
      console.error('Erro de conexão:', err);
      return [];
    }
  },
};