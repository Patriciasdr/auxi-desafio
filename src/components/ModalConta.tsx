import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { cores } from '../theme/tokens';

interface ModalContaProps {
  visivel: boolean;
  aoFechar: () => void;
}

export function ModalConta({ visivel, aoFechar }: ModalContaProps) {
  return (
    <Modal visible={visivel} transparent animationType="slide" onRequestClose={aoFechar}>
      <View style={estilos.modalOverlay}>
        <View style={estilos.modalContent}>
          <View style={estilos.modalBarra} />
          
          <Text style={estilos.modalTitulo}>Configurações de Conta</Text>

          <TouchableOpacity 
            style={estilos.modalOpcao} 
            onPress={() => { aoFechar(); alert('Abrindo Alterar Foto de Perfil…'); }}
            activeOpacity={0.7}
          >
            <View style={estilos.modalIconeFundo}>
              <Text style={estilos.modalIcone}>📸</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={estilos.modalNome}>Alterar Foto de Perfil</Text>
              <Text style={estilos.modalDesc}>Mude a imagem do seu usuário</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={estilos.modalOpcao} 
            onPress={() => { aoFechar(); alert('Abrindo Alterar Senha…'); }}
            activeOpacity={0.7}
          >
            <View style={estilos.modalIconeFundo}>
              <Text style={estilos.modalIcone}>🔑</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={estilos.modalNome}>Alterar Senha</Text>
              <Text style={estilos.modalDesc}>Atualize sua credencial de acesso</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={estilos.modalOpcao} 
            onPress={() => { aoFechar(); alert('Abrindo Dados Cadastrais…'); }}
            activeOpacity={0.7}
          >
            <View style={estilos.modalIconeFundo}>
              <Text style={estilos.modalIcone}>👤</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={estilos.modalNome}>Alterar Dados Cadastrais</Text>
              <Text style={estilos.modalDesc}>Atualize suas informações pessoais</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.btnFecharModal} onPress={aoFechar}>
            <Text style={estilos.btnFecharTexto}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(26, 46, 34, 0.4)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    backgroundColor: cores.branco, 
    borderTopLeftRadius: 28, 
    borderTopRightRadius: 28, 
    padding: 24, 
    paddingTop: 16, 
    shadowColor: '#000', 
    shadowOpacity: 0.15, 
    shadowRadius: 30, 
    elevation: 10 
  },
  modalBarra: { 
    width: 44, 
    height: 5, 
    backgroundColor: '#E2E8E4', 
    borderRadius: 3, 
    alignSelf: 'center', 
    marginBottom: 20 
  },
  modalTitulo: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: cores.texto, 
    marginBottom: 20, 
    letterSpacing: -0.3 
  },
  modalOpcao: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16, 
    padding: 16, 
    backgroundColor: cores.fundo, 
    borderRadius: 14, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: cores.borda 
  },
  modalIconeFundo: { 
    width: 48, 
    height: 48, 
    borderRadius: 12, 
    backgroundColor: cores.verdeClaro, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: cores.borda 
  },
  modalIcone: { 
    fontSize: 22 
  },
  modalNome: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: cores.texto, 
    marginBottom: 2 
  },
  modalDesc: { 
    fontSize: 12, 
    color: cores.textoSuave, 
    lineHeight: 16 
  },
  btnFecharModal: { 
    padding: 16, 
    marginTop: 10, 
    alignItems: 'center', 
    backgroundColor: cores.verdeEscuro, 
    borderRadius: 12 
  },
  btnFecharTexto: { 
    color: cores.branco, 
    fontWeight: '700', 
    fontSize: 15 
  }
});