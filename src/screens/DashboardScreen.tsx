import React, { useState, useLayoutEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useDashboard, ItemModulo } from '../hooks/useDashboard';
import { cores, espaco, raio } from '../theme/tokens';
import { ModalConta } from '../components/ModalConta'; 

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

export function DashboardScreen({ route, navigation }: Props) {
  const { condominioNome, endereco, papel } = route.params;
  const [modalConta, setModalConta] = useState(false); 
  const { modulosFiltrados, grupoAberto, alternarGrupo } = useDashboard({ papel });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => setModalConta(true)}
          style={estilos.btnMenuHeader}
        >
          <Text style={estilos.iconeMenu}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: cores.fundo }}>
      <ScrollView style={estilos.container} contentContainerStyle={{ paddingBottom: 40 }}>
        
        <View style={estilos.cardHeaderMaster}>
          <View style={estilos.headInfo}>
            <Text style={estilos.nomeCondo}>{condominioNome}</Text>
            <View style={estilos.badgePerfilHeader}>
              <Text style={estilos.textoBadgeHeader}>{papel}</Text>
            </View>
            <Text style={estilos.metaCondo}>{endereco}</Text>
          </View>
        </View>

        {modulosFiltrados.map((g) => {
          const estaAberto = grupoAberto === g.g;
          return (
            <View key={g.g} style={[estilos.sanfonaContainer, estaAberto && estilos.sanfonaAbertaShadow]}>
              <TouchableOpacity 
                style={[estilos.sanfonaHeader, estaAberto && estilos.sanfonaHeaderAberto]} 
                onPress={() => alternarGrupo(g.g)}
                activeOpacity={0.7}
              >
                <Text style={estilos.sanfonaTitulo}>{g.g}</Text>
                <View style={[estilos.circuloSeta, estaAberto && estilos.circuloSetaAtivo]}>
                  <Text style={[estilos.sanfonaSeta, estaAberto && { color: cores.branco }]}>
                    {estaAberto ? '▲' : '▼'}
                  </Text>
                </View>
              </TouchableOpacity>

              {estaAberto && (
                <View style={estilos.grid}>
                  {g.itens.map((m: ItemModulo) => (
                    <TouchableOpacity 
                      key={m.nome} 
                      style={estilos.cardItem} 
                      activeOpacity={0.7} 
                      onPress={() => alert(`Abrindo ${m.nome}`)}
                    >
                      <View style={estilos.itemHeader}>
                        <View style={estilos.containerIconeModulo}>
                          <Text style={estilos.itemIcone}>{m.ic}</Text>
                        </View>
                        <View style={estilos.itemInfo}>
                          <Text style={estilos.itemNome} numberOfLines={2}>{m.nome}</Text>
                          <Text style={estilos.itemDesc} numberOfLines={3}>{m.desc}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <ModalConta visivel={modalConta} aoFechar={() => setModalConta(false)} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: espaco.md },
  btnMenuHeader: { padding: 10, justifyContent: 'center', alignItems: 'center', marginRight: -5 },
  iconeMenu: { fontSize: 24, color: cores.branco, fontWeight: 'bold', lineHeight: 24 },

  cardHeaderMaster: {
    backgroundColor: cores.branco,
    padding: 20,
    borderRadius: raio.card,
    marginBottom: espaco.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    shadowColor: cores.verde,
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  headInfo: { flex: 1 },
  nomeCondo: { fontSize: 19, fontWeight: '800', color: cores.texto, letterSpacing: -0.3 },
  metaCondo: { fontSize: 12, color: cores.textoSuave, marginTop: 6, lineHeight: 16 },
  badgePerfilHeader: {
    alignSelf: 'flex-start',
    backgroundColor: cores.verdeClaro,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: raio.badge,
    marginTop: 6,
  },
  textoBadgeHeader: { color: cores.verdeEscuro, fontSize: 11, fontWeight: '700' },

  sanfonaContainer: { backgroundColor: cores.branco, borderRadius: raio.card, marginBottom: 14, overflow: 'hidden', borderWidth: 1, borderColor: cores.borda },
  sanfonaAbertaShadow: { shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 4 },
  
  sanfonaHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 18, alignItems: 'center' },
  
  sanfonaHeaderAberto: { backgroundColor: '#FAFCFA' },
  sanfonaTitulo: { fontSize: 16, fontWeight: '700', color: cores.texto, letterSpacing: -0.2 },
  circuloSeta: { width: 28, height: 28, borderRadius: 14, backgroundColor: cores.fundo, alignItems: 'center', justifyContent: 'center' },
  circuloSetaAtivo: { backgroundColor: cores.verdeEscuro },
  sanfonaSeta: { fontSize: 10, color: cores.textoSuave, fontWeight: '700' },
  grid: { padding: 14, borderTopWidth: 1, borderColor: 'rgba(0, 127, 62, 0.04)', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cardItem: { backgroundColor: cores.branco, borderRadius: 12, width: '48.5%', minHeight: 125, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.03)', padding: 12, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 5, shadowOffset: { width: 0, height: 3 }, elevation: 1 },
  itemHeader: { flexDirection: 'column', gap: 8 },
  containerIconeModulo: { width: 36, height: 36, borderRadius: 8, backgroundColor: cores.fundo, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: cores.borda },
  itemIcone: { fontSize: 18 },
  itemInfo: { flex: 1 },
  itemNome: { fontSize: 13, fontWeight: '700', color: cores.texto, marginBottom: 3, lineHeight: 16 },
  itemDesc: { fontSize: 11, color: cores.textoSuave, lineHeight: 14 }
});