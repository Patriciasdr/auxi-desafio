import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { authService } from '../services/authService';
import { CampoTexto } from '../components/CampoTexto';
import { Botao } from '../components/Botao';
import { cores, espaco, raio } from '../theme/tokens'; // <-- Importamos os tokens diretamente

type Props = NativeStackScreenProps<RootStackParamList, 'Senha'>;

export function SenhaScreen({ route, navigation }: Props) {
  const { nome, cpfMascarado } = route.params;
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mostrar, setMostrar] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    // Validação simplificada: o desafio aceita qualquer senha preenchida
    if (senha.trim().length === 0) {
      setErro('A senha não pode estar vazia.');
      return;
    }

    setErro('');
    setCarregando(true);
    
    try {
      const ok = await authService.autenticar(cpfMascarado, senha);
      if (ok) {
        navigation.navigate('Condominios', { nome });
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

  return (
    <View style={estilos.container}>
      <View style={estilos.card}>
        
        <TouchableOpacity style={estilos.btnVoltar} activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Text style={estilos.voltar}>← Trocar conta</Text>
        </TouchableOpacity>

        <View style={estilos.chip}>
          <View style={estilos.avatar}>
            <Text style={estilos.avatarTexto}>{nome[0]}</Text>
          </View>
          <View>
            <Text style={estilos.ola}>Olá, {nome}</Text>
            <Text style={estilos.cpf}>CPF {cpfMascarado}</Text>
          </View>
        </View>

        <Text style={estilos.titulo}>Digite sua senha</Text>
        <Text style={estilos.sub}>Sua conta foi reconhecida. Informe a senha para acessar.</Text>

        <CampoTexto
          rotulo="Senha"
          placeholder="Digite sua senha"
          secureTextEntry={!mostrar}     /* Oculta os caracteres com asteriscos */
          value={senha}
          onChangeText={(t) => { 
            setSenha(t); 
            setErro(''); 
          }}
          erro={erro}
        />
        
        <TouchableOpacity style={estilos.btnMostrarSenha} activeOpacity={0.7} onPress={() => setMostrar((v) => !v)}>
          <Text style={estilos.link}>{mostrar ? 'Ocultar senha' : 'Mostrar senha'}</Text>
        </TouchableOpacity>

        <Botao titulo="Entrar" onPress={entrar} carregando={carregando} />

        <TouchableOpacity style={estilos.btnEsqueci} activeOpacity={0.7} onPress={() => alert('Recuperação de senha')}>
          <Text style={estilos.btnEsqueciTexto}>Esqueci minha senha</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// 👇 Estilos unificados na base do componente, consumindo o padrão de design unificado
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
  btnVoltar: {
    alignSelf: 'flex-start',
    marginBottom: espaco.md
  },
  voltar: { 
    color: cores.textoSuave, 
    fontSize: 13 
  },
  chip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    backgroundColor: cores.verdeClaro, 
    borderRadius: raio.campo, 
    padding: 11, 
    marginBottom: espaco.md 
  },
  avatar: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: cores.verde, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  avatarTexto: { 
    color: cores.branco, 
    fontWeight: '700' 
  },
  ola: { 
    fontWeight: '700', 
    color: cores.texto, 
    fontSize: 14 
  },
  cpf: { 
    fontSize: 11.5, 
    color: cores.textoSuave 
  },
  titulo: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: cores.texto, 
    marginBottom: 6 
  },
  sub: { 
    fontSize: 13, 
    color: cores.textoSuave, 
    marginBottom: espaco.md, 
    lineHeight: 19 
  },
  btnMostrarSenha: {
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: espaco.md
  },
  link: { 
    color: cores.verdeEscuro, 
    fontSize: 12.5, 
    fontWeight: '600' 
  },
  btnEsqueci: {
    alignItems: 'center',
    marginTop: 14
  },
  btnEsqueciTexto: {
    color: cores.verde,
    fontWeight: '600',
    fontSize: 13.5
  }
});