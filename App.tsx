import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { IdentificacaoScreen } from './src/screens/IdentificacaoScreen';
import { SenhaScreen } from './src/screens/SenhaScreen';
import { CondominiosScreen } from './src/screens/CondominiosScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { cores } from './src/theme/tokens';

// Definindo todas as telas e os parâmetros que elas recebem
export type RootStackParamList = {
  Identificacao: undefined;
  Senha: { nome: string; cpfMascarado: string };
  Condominios: { nome: string };
  Dashboard: { condominioNome: string; endereco: string; papel: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: cores.verdeEscuro },
            headerTintColor: cores.branco,
            headerTitle: 'Auxiliadora Digital',
          }}
        >
          <Stack.Screen name="Identificacao" component={IdentificacaoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Senha" component={SenhaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Condominios" component={CondominiosScreen} options={{ title: 'Meus Condomínios' }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Funcionalidades' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}