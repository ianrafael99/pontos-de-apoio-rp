import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cores, espaco } from '../theme';

export function Secao({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <View style={styles.secao}>
      <Text style={styles.titulo} accessibilityRole="header">
        {titulo}
      </Text>
      {children}
    </View>
  );
}

export function ListaDeItens({ itens, marcador }: { itens: string[]; marcador: string }) {
  return (
    <View>
      {itens.map((item) => (
        <View key={item} style={styles.item}>
          <Text style={styles.marcador} importantForAccessibility="no">
            {marcador}
          </Text>
          <Text style={styles.itemTexto}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  secao: {
    backgroundColor: cores.cartao,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espaco.g,
    marginBottom: espaco.m,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: cores.texto,
    marginBottom: espaco.p,
  },
  item: { flexDirection: 'row', gap: 8, marginTop: 6 },
  marcador: { fontSize: 16, lineHeight: 23, width: 18, fontWeight: '700', color: cores.texto },
  itemTexto: { flex: 1, fontSize: 16, lineHeight: 23, color: cores.texto },
});

export const estilosTexto = StyleSheet.create({
  normal: { fontSize: 16, lineHeight: 23, color: cores.texto },
  suave: { fontSize: 15, lineHeight: 21, color: cores.textoSuave, marginTop: 6 },
});
