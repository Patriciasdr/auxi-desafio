import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { cores, raio, espaco } from '../theme/tokens';

type Props = TextInputProps & {
  rotulo: string;
  erro?: string;
};

export function CampoTexto({ rotulo, erro, ...rest }: Props) {
  return (
    <View style={{ marginBottom: espaco.md }}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput
        style={[
          estilos.input, 
          !!erro && { borderColor: cores.vermelho, backgroundColor: '#FFF5F5' }
        ]}
        placeholderTextColor={cores.textoSuave}
        {...rest}
      />
      {!!erro && <Text style={estilos.erro}>⚠️ {erro}</Text>}
    </View>
  );
}

const estilos = StyleSheet.create({
  rotulo: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: cores.texto, 
    marginBottom: 8,
    letterSpacing: 0.2
  },
  input: {
    borderWidth: 1.5,
    borderColor: cores.borda,
    borderRadius: raio.campo,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#FAFCFA',
    color: cores.texto,
  },
  erro: { 
    color: cores.vermelho, 
    fontSize: 12.5, 
    marginTop: 6,
    fontWeight: '500'
  },
});