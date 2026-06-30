import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { cores, espaco, raio } from '../theme/tokens';
import { ModalConta } from '../components/ModalConta';

type Props = NativeStackScreenProps<RootStackParamList, 'Condominios'>;

const listaCondominios = [
  { id: 'c1', nome: 'Residencial Jardim das Acacia', endereco: 'Av. Ipiranga, 1200 — Porto Alegre/RS', papel: 'Síndico' },
  { id: 'c2', nome: 'Edifício Mont Blanc', endereco: 'R. dos Andradas, 455 — Porto Alegre/RS', papel: 'Proprietário' },
  { id: 'c3', nome: 'Condomínio Vista Verde', endereco: 'Av. Carlos Gomes, 890 — Porto Alegre/RS', papel: 'Morador' },
];

export function CondominiosScreen({ navigation, route }: Props) {
  const { nome } = route.params;
  const [modalConta, setModalConta] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerLeft: () => null,
      headerRight: () => (
        <View style={estilos.headerRightContainer}>
          
          <TouchableOpacity 
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'Identificacao' }],
            })} 
            style={estilos.btnSairHeader}
            activeOpacity={0.7}
          >
            <Text style={estilos.txtNomeHeader}>{nome}</Text>
            <Text style={estilos.txtSairHeader}>Sair</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setModalConta(true)}
            style={estilos.btnPontinhosHeader}
          >
            <Text style={estilos.iconePontinhos}>☰</Text>
          </TouchableOpacity>
          
        </View>
      ),
    });
  }, [navigation, nome]);

  function acessarDashboard(condominio: typeof listaCondominios[0]) {
    navigation.navigate('Dashboard', {
      condominioNome: condominio.nome,
      endereco: condominio.endereco,
      papel: condominio.papel, 
      nome: nome
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: cores.fundo }}>
      <View style={estilos.container}>
        
        <View style={estilos.headerRow}>
          <View style={estilos.headInfo}>
            <Text style={estilos.boasVindas}>Olá, {nome}!</Text>
            <Text style={estilos.sub}>Você tem acesso a mais de um condomínio. Escolha qual deseja gerenciar agora.</Text>
          </View>
        </View>

        <FlatList
          data={listaCondominios}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity 
                style={estilos.card} 
                activeOpacity={0.7} 
                onPress={() => acessarDashboard(item)}
              >
                <View style={estilos.icone}>
                  <Text style={estilos.iconePredio}>🏢</Text>
                </View>

                <View style={estilos.info}>
                  <Text style={estilos.nomeCond} numberOfLines={1}>{item.nome}</Text>
                  <Text style={estilos.end} numberOfLines={1}>{item.endereco}</Text>
                  
                  <View style={estilos.badge}>
                    <Text style={estilos.papelTexto}>{item.papel}</Text>
                  </View>
                </View>

                <Text style={estilos.seta}>›</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <ModalConta visivel={modalConta} aoFechar={() => setModalConta(false)} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: espaco.md },
  headerRightContainer: { flexDirection: 'row', alignItems: 'center', marginRight: -5 },
  btnSairHeader: { alignItems: 'flex-end', marginRight: 12 },
  txtNomeHeader: { fontSize: 12, color: cores.branco, fontWeight: '600', marginBottom: 2 },
  txtSairHeader: { fontSize: 11, color: cores.branco, textDecorationLine: 'underline' },
  btnPontinhosHeader: { padding: 8, justifyContent: 'center', alignItems: 'center' },
  iconePontinhos: { fontSize: 24, color: cores.branco, fontWeight: 'bold', lineHeight: 24 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: espaco.md, marginTop: espaco.xs },
  headInfo: { flex: 1 },
  boasVindas: { fontSize: 22, fontWeight: '800', color: cores.texto, marginBottom: 6, letterSpacing: -0.4 },
  sub: { fontSize: 13, color: cores.textoSuave, lineHeight: 19 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.branco, padding: 16, borderRadius: raio.card, borderWidth: 1, borderColor: cores.borda, marginBottom: 12, shadowColor: cores.verdeEscuro, shadowOpacity: 0.04, shadowRadius: 15, shadowOffset: { width: 0, height: 6 }, elevation: 2 },
  icone: { width: 48, height: 48, borderRadius: 10, overflow: 'hidden', marginRight: 14, backgroundColor: cores.verdeClaro, borderWidth: 1, borderColor: cores.borda, alignItems: 'center', justifyContent: 'center' },
  iconePredio: { fontSize: 24 },
  info: { flex: 1, minWidth: 0 },
  nomeCond: { fontSize: 16, fontWeight: '700', color: cores.texto, letterSpacing: -0.2, marginBottom: 2 },
  end: { fontSize: 12, color: cores.textoSuave, lineHeight: 16, marginBottom: 6 },
  badge: { 
    alignSelf: 'flex-start', 
    paddingHorizontal: 10, 
    paddingVertical: 3, 
    borderRadius: raio.badge,
    backgroundColor: 'rgba(0, 168, 89, 0.1)' 
  },
  papelTexto: { 
    fontSize: 11, 
    fontWeight: '700', 
    letterSpacing: 0.2,
    color: cores.verdeEscuro 
  },
  seta: { fontSize: 24, color: cores.textoSuave, fontWeight: '300', marginLeft: 8 }
});