import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';

interface UseSenhaProps {
  cpf: string;
  nome: string;
  onLoginSucesso: () => void;
}

export function useSenha({ cpf, nome, onLoginSucesso }: UseSenhaProps) {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mostrar, setMostrar] = useState(false);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    async function buscarSenhaSalva() {
      try {
        const senhaGuardada = await storageService.ler(`@senha_${cpf}`);
        if (senhaGuardada) {
          setSenha(senhaGuardada);
        }
      } catch (error) {
        console.error("Erro ao buscar senha salva:", error);
      }
    }
    buscarSenhaSalva();
  }, [cpf]);

  function inverterMostrarSenha() {
    setMostrar((v) => !v);
  }

  function lidarComMudancaSenha(texto: string) {
    setSenha(texto);
    setErro('');
  }

  async function entrar() {
    if (senha.trim().length === 0) {
      setErro('A senha não pode estar vazia.');
      return;
    }

    setErro('');
    setCarregando(true);
    
    try {
      const ok = await authService.autenticar(cpf, senha);
      if (ok) {
        const dadosUsuario = { nome, cpf };
        await storageService.salvar('@usuario_logado', JSON.stringify(dadosUsuario));
        await storageService.salvar(`@senha_${cpf}`, senha);

        onLoginSucesso();
      } else {
        setErro('Senha incorreta.');
      }
    } catch (error) {
      Alert.alert(
        'Falha na Autenticação',
        'Ocorreu um erro ao validar sua senha. Por favor, tente novamente mais tarde.',
        [{ text: 'Ok' }]
      );
    } finally {
      setCarregando(false);
    }
  }

  return {
    senha,
    erro,
    mostrar,
    carregando,
    inverterMostrarSenha,
    lidarComMudancaSenha,
    entrar
  };
}