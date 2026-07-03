import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { storageService } from './src/services/storageService'; // 💡 1. Importando o Cofre Inteligente híbrido

import { IdentificacaoScreen } from './src/screens/IdentificacaoScreen';
import { SenhaScreen } from './src/screens/SenhaScreen';
import { CondominiosScreen } from './src/screens/CondominiosScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { cores } from './src/theme/tokens';

export type RootStackParamList = {
  Identificacao: undefined;
  Senha: { nome: string; cpfMascarado: string; cpf: string };
  Condominios: { nome: string; cpf: string };
  Dashboard: { condominioNome: string; endereco: string; papel: string; nome: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const CHAVE_ESTADO_NAVEGACAO = '@estado_navegacao';

export default function App() {

  const [carregandoSessao, setCarregandoSessao] = useState(true);
  const [usuarioSalvo, setUsuarioSalvo] = useState<{ nome: string; cpf: string } | null>(null);
  
  const [estadoInicialNavegacao, setEstadoInicialNavegacao] = useState();

  useEffect(() => {
    async function verificarSessao() {
      try {

        const dados = await storageService.ler('@usuario_logado');
        if (dados) {
          setUsuarioSalvo(JSON.parse(dados));
          
          const estadoSalvo = await storageService.ler(CHAVE_ESTADO_NAVEGACAO);
          if (estadoSalvo) {
            setEstadoInicialNavegacao(JSON.parse(estadoSalvo));
          }
        }
      } catch (error) {
        console.error("Erro ao carregar a sessão do usuário:", error);
      } finally {
        setCarregandoSessao(false);
      }
    }
    verificarSessao();
  }, []);

  if (carregandoSessao) {
    return (
      <View style={{ flex: 1, backgroundColor: cores.fundo, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={cores.verde} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      {}
      <NavigationContainer 
        initialState={estadoInicialNavegacao}
        onStateChange={(estado) => {
          if (estado) {
            storageService.salvar(CHAVE_ESTADO_NAVEGACAO, JSON.stringify(estado));
          }
        }}
      >
        {}
        <Stack.Navigator
          initialRouteName={usuarioSalvo ? 'Condominios' : 'Identificacao'}
          screenOptions={{
            headerStyle: { backgroundColor: cores.verde },
            headerTintColor: cores.branco,
            headerTitle: 'Auxiliadora Digital',
          }}
        >
          <Stack.Screen name="Identificacao" component={IdentificacaoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Senha" component={SenhaScreen} options={{ headerShown: false }} />
          
          <Stack.Screen 
            name="Condominios" 
            component={CondominiosScreen} 
            options={{ title: 'Meus Condomínios' }}
            initialParams={usuarioSalvo ? { nome: usuarioSalvo.nome, cpf: usuarioSalvo.cpf } : undefined}
          />
          
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Funcionalidades' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}