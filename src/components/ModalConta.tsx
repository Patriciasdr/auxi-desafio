import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Animated, useWindowDimensions } from 'react-native';
import { cores } from '../theme/tokens';

interface ModalContaProps {
  visivel: boolean;
  aoFechar: () => void;
}

export function ModalConta({ visivel, aoFechar }: ModalContaProps) {
  const { width: LARGURA_TELA } = useWindowDimensions();
  const ehTelaGrande = LARGURA_TELA > 768;

  const [mostrarModal, setMostrarModal] = useState(visivel);
  const slideAnim = useRef(new Animated.Value(LARGURA_TELA)).current;

  useEffect(() => {
    if (visivel) {
      setMostrarModal(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: LARGURA_TELA,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setMostrarModal(false);
      });
    }
  }, [visivel, slideAnim, LARGURA_TELA]);

  return (
    <Modal visible={mostrarModal} transparent animationType="fade" onRequestClose={aoFechar}>
      <View style={estilos.modalOverlay}>
        
        <Pressable style={StyleSheet.absoluteFill} onPress={aoFechar} />
        
        <Animated.View style={[
          estilos.sidebarContent, 
          { 
            width: ehTelaGrande ? 400 : '85%', 
            transform: [{ translateX: slideAnim }] 
          }
        ]}>
          
          <View style={estilos.headerVerde}>
            <Text style={estilos.tituloMenu}>Configurações</Text>
            <TouchableOpacity 
              onPress={aoFechar} 
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Text style={estilos.iconeFechar}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={estilos.opcoesContainer}>
            
            <TouchableOpacity style={estilos.modalOpcao} onPress={() => { aoFechar(); setTimeout(() => alert('Abrindo Alterar Foto de Perfil…'), 300); }} activeOpacity={0.7}>
              <View style={estilos.modalIconeFundo}>
                <Text style={estilos.modalIcone}>📸</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={estilos.modalNome}>Alterar Foto de Perfil</Text>
                <Text style={estilos.modalDesc}>Mude a imagem do seu usuário</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.modalOpcao} onPress={() => { aoFechar(); setTimeout(() => alert('Abrindo Alterar Senha…'), 300); }} activeOpacity={0.7}>
              <View style={estilos.modalIconeFundo}>
                <Text style={estilos.modalIcone}>🔑</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={estilos.modalNome}>Alterar Senha</Text>
                <Text style={estilos.modalDesc}>Atualize sua credencial de acesso</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.modalOpcao} onPress={() => { aoFechar(); setTimeout(() => alert('Abrindo Dados Cadastrais…'), 300); }} activeOpacity={0.7}>
              <View style={estilos.modalIconeFundo}>
                <Text style={estilos.modalIcone}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={estilos.modalNome}>Alterar Dados</Text>
                <Text style={estilos.modalDesc}>Atualize suas informações pessoais</Text>
              </View>
            </TouchableOpacity>

          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(20, 35, 27, 0.45)',
    flexDirection: 'row', 
    justifyContent: 'flex-end' 
  },
  sidebarContent: { 
    height: '100%', 
    backgroundColor: cores.branco, 
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24, 
    overflow: 'hidden', 
    shadowColor: '#1A2E22', 
    shadowOpacity: 0.08,
    shadowRadius: 25, 
    shadowOffset: { width: -4, height: 0 },
    elevation: 10 
  },
  headerVerde: { 
    backgroundColor: cores.verde, 
    paddingTop: 64,
    paddingBottom: 28, 
    paddingHorizontal: 24, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  tituloMenu: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: cores.branco, 
    letterSpacing: -0.5 
  },
  iconeFechar: { 
    fontSize: 20, 
    color: cores.branco, 
    opacity: 0.85,
    fontWeight: 'normal' 
  },
  opcoesContainer: { 
    paddingHorizontal: 20,
    gap: 4
  },
  modalOpcao: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16, 
    padding: 16, 
    marginBottom: 12, 
    backgroundColor: '#FAFCFA',
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: cores.borda,
    shadowColor: '#000',
    shadowOpacity: 0.01,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  modalIconeFundo: { 
    width: 48, 
    height: 48, 
    borderRadius: 12,
    backgroundColor: cores.verdeClaro, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  modalIcone: { 
    fontSize: 20 
  },
  modalNome: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: cores.texto, 
    marginBottom: 3 
  },
  modalDesc: { 
    fontSize: 12, 
    color: cores.textoSuave, 
    lineHeight: 16 
  }
});