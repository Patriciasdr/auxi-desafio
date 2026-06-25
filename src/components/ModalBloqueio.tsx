import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Botao } from './Botao';
import { cores, espaco } from '../theme/tokens';

type Props = { 
  visivel: boolean; 
  aoFechar: () => void;
  nomeCliente?: string; // Propriedade nova para receber o nome vindo da busca
};

export function ModalBloqueio({ visivel, aoFechar, nomeCliente }: Props) {
  // Se houver nome, exibe "Prezado João Souza,", caso contrário exibe a mensagem padrão
  const saudacao = nomeCliente ? `Prezado ${nomeCliente},` : 'Prezado(a) cliente,';

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={aoFechar}>
      <View style={estilos.overlay}>
        <View style={estilos.modal}>
          <View style={estilos.icone}><Text style={{ fontSize: 30 }}>⚠️</Text></View>
          
          <Text style={estilos.titulo}>Atualização de cadastro necessária</Text>
          
          <Text style={estilos.saudacaoDinamica}>{saudacao}</Text>
          
          <Text style={estilos.texto}>
            Sua conta está cadastrada sem um CPF vinculado. Por segurança, precisamos atualizar
            seu cadastro antes de liberar o acesso.
          </Text>
          <Text style={estilos.contato}>
            Entre em contato com o gerente da sua unidade ou o administrador responsável.
          </Text>
          <Botao titulo="Entendi" onPress={aoFechar} />
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15,30,22,0.55)', justifyContent: 'center', padding: espaco.lg },
  modal: { backgroundColor: cores.branco, borderRadius: 14, padding: espaco.lg, alignItems: 'center' },
  icone: { width: 60, height: 60, borderRadius: 30, backgroundColor: cores.amareloBg, alignItems: 'center', justifyContent: 'center', marginBottom: espaco.md },
  titulo: { fontSize: 18, fontWeight: '700', color: cores.texto, textAlign: 'center', marginBottom: 14 },
  saudacaoDinamica: { fontSize: 14, fontWeight: '700', color: cores.verdeEscuro, alignSelf: 'flex-start', marginBottom: 6 },
  texto: { fontSize: 13.5, color: cores.textoSuave, textAlign: 'left', lineHeight: 20, marginBottom: 8 },
  contato: { fontSize: 13, color: cores.texto, textAlign: 'left', lineHeight: 20 },
});