import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Botao } from './Botao';
import { cores, espaco } from '../theme/tokens';

type Props = { 
  visivel: boolean; 
  aoFechar: () => void;
};

export function ModalBloqueio({ visivel, aoFechar }: Props) {
  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={aoFechar}>
      <View style={estilos.overlay}>
        <View style={estilos.modal}>
          
          <View style={estilos.icone}>
            <Text style={{ fontSize: 30 }}>⚠️</Text>
          </View>
          
          <Text style={estilos.titulo}>Atualização de cadastro necessária</Text>
          
          <Text style={estilos.textoPrincipal}>
            Sua conta está cadastrada apenas com e-mail ou nome de usuário, sem um CPF vinculado. Por segurança, precisamos atualizar seu cadastro antes de liberar o acesso.
          </Text>
          
          <View style={estilos.boxInformativo}>
            <Text style={estilos.boxTitulo}>O que fazer agora:</Text>
            
            <Text style={estilos.boxTexto}>
              Entre em contato com o <Text style={estilos.negrito}>gerente da sua unidade</Text> ou com o administrador responsável pelo seu contrato para concluir a atualização.
            </Text>
            
            <View style={estilos.linhaContato}>
              <Text style={estilos.emojiContato}>📞</Text>
              <Text style={estilos.textoContato}>
                Central de Relacionamento: <Text style={estilos.destaqueVerde}>0800 000 0000</Text>
              </Text>
            </View>

            <View style={estilos.linhaContato}>
              <Text style={estilos.emojiContato}>✉️</Text>
              <Text style={estilos.textoContato}>atendimento@auxiliadorapredial.com.br</Text>
            </View>
          </View>
          
          <Botao titulo="Entendi" onPress={aoFechar} />
          
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(15,30,22,0.55)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: espaco.lg 
  },
  modal: { 
    backgroundColor: cores.branco, 
    borderRadius: 16, 
    padding: 24, 
    alignItems: 'center',
    width: '100%',
    maxWidth: 440,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5
  },
  icone: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: cores.amareloBg, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: espaco.md 
  },
  titulo: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: cores.texto, 
    textAlign: 'center', 
    marginBottom: 12 
  },
  textoPrincipal: { 
    fontSize: 14, 
    color: cores.textoSuave, 
    textAlign: 'center', 
    lineHeight: 22, 
    marginBottom: 20,
    paddingHorizontal: 10
  },
  boxInformativo: {
    backgroundColor: '#F2F6F4',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
  },
  boxTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: cores.verdeEscuro,
    marginBottom: 6,
  },
  boxTexto: {
    fontSize: 13.5,
    color: cores.texto,
    lineHeight: 20,
    marginBottom: 14,
  },
  negrito: {
    fontWeight: '700',
    color: cores.verdeEscuro,
  },
  linhaContato: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  emojiContato: {
    fontSize: 14,
    marginRight: 8,
    color: '#E04A7B',
  },
  textoContato: {
    fontSize: 13.5,
    color: cores.texto,
  },
  destaqueVerde: {
    fontWeight: '700',
    color: cores.verdeEscuro,
  }
});