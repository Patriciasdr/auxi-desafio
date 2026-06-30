import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { CampoTexto } from '../components/CampoTexto';
import { Botao } from '../components/Botao';
import { ModalBloqueio } from '../components/ModalBloqueio';
import { cores, espaco, raio } from '../theme/tokens'; 
import { useIdentificacao } from '../hooks/useIdentificacao'; // 🌟 Importando o seu Hook!

type Props = NativeStackScreenProps<RootStackParamList, 'Identificacao'>;

export function IdentificacaoScreen({ navigation }: Props) {

  const { 
    cpf, 
    erro, 
    carregando, 
    bloqueado, 
    setBloqueado, 
    lidarComMudancaCpf, 
    continuar 
  } = useIdentificacao(navigation);

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
          onChangeText={lidarComMudancaCpf} 
          erro={erro}
          maxLength={14}
          onSubmitEditing={continuar} 
        />

        <Botao titulo="Continuar" onPress={continuar} carregando={carregando} />
      </View>

      <ModalBloqueio 
        visivel={bloqueado} 
        aoFechar={() => setBloqueado(false)} 
      />
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: cores.fundo, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: espaco.lg 
  },
  card: { 
    backgroundColor: cores.branco, 
    borderRadius: raio.card, 
    padding: espaco.lg,
    width: '100%',
    maxWidth: 400,
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