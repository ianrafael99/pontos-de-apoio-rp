import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ROTULO_CATEGORIA } from '../data/pontos';
import { cores, espaco } from '../theme';
import { PontoComDistancia } from '../types';
import { formatarDistancia } from '../utils/distancia';

interface Props {
  ponto: PontoComDistancia;
  maisProximo: boolean;
  onPress: () => void;
}

export function PontoCard({ ponto, maisProximo, onPress }: Props) {
  const distancia =
    ponto.distanciaMetros !== null
      ? formatarDistancia(ponto.distanciaMetros)
      : null;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Ponto de Apoio ${ponto.nome}. ${ponto.endereco}.${
        distancia ? ` A ${distancia} de você.` : ''
      } Toque para ver detalhes.`}
      style={({ pressed }) => [styles.cartao, pressed && styles.pressionado]}
    >
      <View style={styles.linhaTopo}>
        <Text style={styles.nome}>{ponto.nome}</Text>
        {distancia && <Text style={styles.distancia}>{distancia}</Text>}
      </View>

      {maisProximo && <Text style={styles.maisProximo}>Mais próximo de você</Text>}

      <Text style={styles.endereco}>{ponto.endereco}</Text>

      <View style={styles.etiquetas}>
        {ponto.categorias.map((c) => (
          <Text key={c} style={styles.etiqueta}>
            {ROTULO_CATEGORIA[c]}
          </Text>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: cores.cartao,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espaco.g,
    marginBottom: espaco.m,
    minHeight: 96,
  },
  pressionado: { backgroundColor: cores.primariaClara },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: espaco.m,
  },
  nome: { flex: 1, fontSize: 19, fontWeight: '700', color: cores.texto },
  distancia: { fontSize: 17, fontWeight: '700', color: cores.primaria },
  maisProximo: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '700',
    color: cores.primaria,
  },
  endereco: {
    marginTop: 6,
    fontSize: 16,
    lineHeight: 22,
    color: cores.textoSuave,
  },
  etiquetas: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  etiqueta: {
    fontSize: 13,
    fontWeight: '600',
    color: cores.primariaEscura,
    backgroundColor: cores.primariaClara,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
