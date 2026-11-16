import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { cores } from '../theme';

interface Props {
  titulo: string;
  onPress: () => void;
  variante?: 'cheio' | 'contorno';
  carregando?: boolean;
  dica?: string;
}

export function Botao({
  titulo,
  onPress,
  variante = 'cheio',
  carregando = false,
  dica,
}: Props) {
  const cheio = variante === 'cheio';
  return (
    <Pressable
      onPress={onPress}
      disabled={carregando}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityHint={dica}
      accessibilityState={{ busy: carregando, disabled: carregando }}
      style={({ pressed }) => [
        styles.base,
        cheio ? styles.cheio : styles.contorno,
        pressed && { opacity: 0.8 },
      ]}
    >
      {carregando ? (
        <ActivityIndicator color={cheio ? cores.branco : cores.primaria} />
      ) : (
        <Text style={[styles.texto, !cheio && { color: cores.primaria }]}>
          {titulo}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  cheio: { backgroundColor: cores.primaria },
  contorno: {
    backgroundColor: cores.branco,
    borderWidth: 2,
    borderColor: cores.primaria,
  },
  texto: { fontSize: 17, fontWeight: '700', color: cores.branco },
});
