import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  async salvar(chave: string, valor: string) {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(chave, valor);
    } else {
      await SecureStore.setItemAsync(chave, valor);
    }
  },

  async ler(chave: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(chave);
    } else {
      return await SecureStore.getItemAsync(chave);
    }
  },

  async remover(chave: string) {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(chave);
    } else {
      await SecureStore.deleteItemAsync(chave);
    }
  }
};