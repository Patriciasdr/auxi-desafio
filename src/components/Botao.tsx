import React from 'react';
import { Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { cores, raio, espaco } from '../theme/tokens';

type Props = {
  titulo: string;
  onPress: () => void;
  carregando?: boolean;
  desabilitado?: boolean;
};

export function Botao({ titulo, onPress, carregando, desabilitado }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={desabilitado || carregando}
      style={[estilos.botao, (desabilitado || carregando) && estilos.desabilitado]}
    >
      {carregando ? (
        <ActivityIndicator color={cores.branco} />
      ) : (
        <Text style={estilos.texto}>{titulo}</Text>
      )}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    backgroundColor: cores.verde,
    paddingVertical: 14,
    width: '100%',
    borderRadius: raio.campo,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: espaco.md,
  },
  desabilitado: { opacity: 0.5 },
  texto: { color: cores.branco, fontWeight: '700', fontSize: 15 },
});