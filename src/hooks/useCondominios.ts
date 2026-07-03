import { useState, useEffect } from 'react';
import { authService, Condominio } from '../services/authService';
import { storageService } from '../services/storageService';

interface UseCondominiosProps {
  cpf: string;
  onLogoutSucesso: () => void;
}

export function useCondominios({ cpf, onLogoutSucesso }: UseCondominiosProps) {
  const [condominiosDoBanco, setCondominiosDoBanco] = useState<Condominio[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarCondominios() {
      try {
        setCarregando(true);
        const dados = await authService.listarCondominios(cpf);
        setCondominiosDoBanco(dados);
      } catch (error) {
        console.error("Erro ao carregar os condomínios na tela:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarCondominios();
  }, [cpf]);

  async function deslogar() {
    try {
      await storageService.remover('@usuario_logado');
      await storageService.remover('@estado_navegacao');
      
      onLogoutSucesso();
    } catch (error) {
      console.error("Erro ao deslogar o usuário:", error);
    }
  }

  return {
    condominiosDoBanco,
    carregando,
    deslogar
  };
}