import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { aplicarMascaraCpf, soNumeros } from '../utils/cpf';
import { authService } from '../services/authService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Identificacao'>;

export function useIdentificacao(navigation: NavigationProp) {
  const [cpf, setCpf] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);

  function lidarComMudancaCpf(texto: string) {
    setCpf(aplicarMascaraCpf(texto));
    setErro('');
  }

  async function continuar() {
    const numeros = soNumeros(cpf);
    
    if (numeros.length !== 11) {
      setErro('Digite os 11 dígitos do CPF.');
      return;
    }
    
    setErro('');
    setCarregando(true);
    
    try {
      const r = await authService.identificarPorCpf(numeros);
      
      if (r.status === 'ACESSO_DIRETO') {
        navigation.navigate('Senha', {
          nome: r.nome!,
          cpfMascarado: r.cpfMascarado!,
          cpf: numeros,
        });
      } else {
        setBloqueado(true);
      }
    } catch (error) {
      setErro('Ocorreu um erro ao identificar a conta. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return {
    cpf,
    erro,
    carregando,
    bloqueado,
    setBloqueado,
    lidarComMudancaCpf,
    continuar
  };
}