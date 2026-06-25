import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'; // <-- Agrupamos o StyleSheet aqui em cima
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { aplicarMascaraCpf, soNumeros } from '../utils/cpf';
import { authService } from '../services/authService';
import { CampoTexto } from '../components/CampoTexto';
import { Botao } from '../components/Botao';
import { ModalBloqueio } from '../components/ModalBloqueio';
import { cores, espaco, raio } from '../theme/tokens'; // <-- Importamos os tokens diretamente

type Props = NativeStackScreenProps<RootStackParamList, 'Identificacao'>;

export function IdentificacaoScreen({ navigation }: Props) {
  const [cpf, setCpf] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [nomeBloqueado, setNomeBloqueado] = useState<string | undefined>('');

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
        });
      } else {
        setNomeBloqueado(r.nome);
        setBloqueado(true);
      }
    } catch (error) {
      setErro('Ocorreu um erro ao identificar a conta. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={estilos.card}>
        <Text style={estilos.titulo}>Vamos começar</Text>
        
        <Text style={estilos.sub}>
          Digite seu CPF para identificarmos sua conta. Unificamos seu acesso da Auxiliadora e do antigo sistema Neon em um só lugar.
        </Text>

        <CampoTexto
          rotulo="CPF"
          placeholder="000.000.000-00"
          keyboardType="number-pad"
          value={cpf}
          onChangeText={(t) => { setCpf(aplicarMascaraCpf(t)); setErro(''); }}
          erro={erro}
          maxLength={14}
          onSubmitEditing={continuar} 
        />

        <Botao titulo="Continuar" onPress={continuar} carregando={carregando} />
      </View>

      <ModalBloqueio 
        visivel={bloqueado} 
        aoFechar={() => setBloqueado(false)} 
        nomeCliente={nomeBloqueado} 
      />
    </KeyboardAvoidingView>
  );
}

// 👇 Todos os estilos acoplados perfeitamente aqui no final do arquivo!
const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: cores.fundo, 
    justifyContent: 'center', 
    padding: espaco.lg 
  },
  card: { 
    backgroundColor: cores.branco, 
    borderRadius: raio.card, 
    padding: espaco.lg,
    shadowColor: cores.texto,
    shadowOpacity: 0.08,
    shadowRadius: 35,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  titulo: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: cores.texto, 
    marginBottom: 6 
  },
  sub: { 
    fontSize: 13, 
    color: cores.textoSuave, 
    marginBottom: espaco.md, 
    lineHeight: 19 
  }
});