import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { cores, espaco, raio } from '../theme/tokens';

const logoAuxiliadora = require('../assets/logo-auxiliadora.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Condominios'>;

// O mapa de cores oficial integrado direto com os seus tokens de design
export const coresPapeis: Record<string, { fundo: string; texto: string }> = {
  Síndico: { fundo: cores.amareloBg, texto: '#B8860B' }, // Marrom-dourado para garantir o contraste e acessibilidade
  Proprietário: { fundo: cores.verde, texto: cores.branco },
  Morador: { fundo: cores.verdeClaro, texto: cores.verdeEscuro },
  Padrão: { fundo: cores.verdeClaro, texto: cores.verdeEscuro },
};

const listaCondominios = [
  { id: 'c1', nome: 'Residencial Jardim das Acacia', endereco: 'Av. Ipiranga, 1200 — Porto Alegre/RS', papel: 'Síndico' },
  { id: 'c2', nome: 'Edifício Mont Blanc', endereco: 'R. dos Andradas, 455 — Porto Alegre/RS', papel: 'Proprietário' },
  { id: 'c3', nome: 'Condomínio Vista Verde', endereco: 'Av. Carlos Gomes, 890 — Porto Alegre/RS', papel: 'Morador' },
];

export function CondominiosScreen({ navigation, route }: Props) {
  const { nome } = route.params;

  function acessarDashboard(condominio: typeof listaCondominios[0]) {
    navigation.navigate('Dashboard', {
      condominioNome: condominio.nome,
      endereco: condominio.endereco,
      papel: condominio.papel, 
    });
  }

  function getCorPerfil(papel: string) {
    return coresPapeis[papel] || coresPapeis['Padrão'];
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.boasVindas}>Olá, {nome}!</Text>
      <Text style={estilos.sub}>Você tem acesso a mais de um condomínio. Escolha qual deseja gerenciar agora.</Text>

      <FlatList
        data={listaCondominios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const coresDoPerfil = getCorPerfil(item.papel);

          return (
            <TouchableOpacity 
              style={estilos.card} 
              activeOpacity={0.7} 
              onPress={() => acessarDashboard(item)}
            >
              <View style={estilos.icone}>
                <Image 
                  source={logoAuxiliadora} 
                  style={estilos.imagemLogo} 
                  resizeMode="cover" 
                />
              </View>

              <View style={estilos.info}>
                <Text style={estilos.nomeCond} numberOfLines={1}>{item.nome}</Text>
                <Text style={estilos.end} numberOfLines={1}>{item.endereco}</Text>
                
                <View style={[estilos.badge, { backgroundColor: coresDoPerfil.fundo }]}>
                  <Text style={[estilos.papelTexto, { color: coresDoPerfil.texto }]}>
                    {item.papel}
                  </Text>
                </View>
              </View>

              <Text style={estilos.seta}>›</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

// Os seus estilos exatos acoplados na base do arquivo
const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: cores.fundo, 
    padding: espaco.lg 
  },
  boasVindas: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: cores.texto, 
    marginBottom: 4 
  },
  sub: { 
    fontSize: 13, 
    color: cores.textoSuave, 
    marginBottom: espaco.xl,
    lineHeight: 18
  },
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: cores.branco, 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 1.6, 
    borderColor: cores.borda, 
    marginBottom: 12 
  },
  icone: { 
    width: 46, 
    height: 46, 
    borderRadius: 11, 
    overflow: 'hidden', 
    marginRight: 14, 
    backgroundColor: cores.verdeClaro 
  },
  imagemLogo: { 
    width: '100%', 
    height: '100%' 
  },
  info: { 
    flex: 1,
    minWidth: 0 
  },
  nomeCond: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: cores.texto, 
    marginBottom: 2 
  },
  end: { 
    fontSize: 12.5, 
    color: cores.textoSuave, 
    marginBottom: 6 
  },
  badge: { 
    alignSelf: 'flex-start', 
    paddingHorizontal: 9, 
    paddingVertical: 2, 
    borderRadius: 9 
  },
  papelTexto: { 
    fontSize: 10.5, 
    fontWeight: '600', 
    letterSpacing: 0.3
  },
  seta: { 
    fontSize: 22, 
    color: cores.textoSuave, 
    marginLeft: 4 
  }
});