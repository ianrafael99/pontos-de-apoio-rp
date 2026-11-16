import { Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Botao } from '../components/Botao';
import { ListaDeItens, Secao, estilosTexto } from '../components/Secao';
import {
  AVISO_FERIADOS,
  HORARIO_TEXTO,
  NAO_PODE_LEVAR,
  PODE_LEVAR,
  ROTULO_CATEGORIA,
} from '../data/pontos';
import { cores, espaco } from '../theme';
import { PontoComDistancia } from '../types';
import { formatarDistancia } from '../utils/distancia';
import { situacaoAgora } from '../utils/horario';
import { urlDaRota } from '../utils/mapas';

export function DetalheScreen({ ponto }: { ponto: PontoComDistancia }) {
  const situacao = situacaoAgora(new Date());

  const abrirRota = async () => {
    try {
      await Linking.openURL(urlDaRota(ponto.coordenada));
    } catch {
      Alert.alert(
        'Não foi possível abrir o mapa',
        `Procure pelo endereço: ${ponto.endereco}`,
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Text style={styles.nome} accessibilityRole="header">
        {ponto.nome}
      </Text>
      <Text style={styles.endereco}>{ponto.endereco}</Text>
      {ponto.distanciaMetros !== null && (
        <Text style={styles.distancia}>
          A {formatarDistancia(ponto.distanciaMetros)} de você, em linha reta
        </Text>
      )}

      <View style={styles.botao}>
        <Botao
          titulo="Ver rota no mapa"
          dica="Abre o aplicativo de mapas com a rota até este Ponto de Apoio"
          onPress={abrirRota}
        />
        {ponto.coordenadaAConfirmar && (
          <Text style={estilosTexto.suave}>
            A posição deste ponto no mapa é aproximada. Confira pelo endereço.
          </Text>
        )}
      </View>

      <Secao titulo="Horário de funcionamento">
        <Text
          style={[
            styles.situacao,
            { color: situacao.aberto ? cores.aberto : cores.fechado },
          ]}
        >
          {situacao.texto}
        </Text>
        {HORARIO_TEXTO.map((linha) => (
          <Text key={linha} style={estilosTexto.normal}>
            {linha}
          </Text>
        ))}
        <Text style={estilosTexto.suave}>{AVISO_FERIADOS}</Text>
      </Secao>

      <Secao titulo="Tipo de recebimento">
        {ponto.categorias.map((c) => (
          <Text key={c} style={estilosTexto.normal}>
            {ROTULO_CATEGORIA[c]}
          </Text>
        ))}
      </Secao>

      <Secao titulo="O que pode levar">
        <ListaDeItens itens={PODE_LEVAR} marcador="✓" />
      </Secao>

      <Secao titulo="O que não pode levar">
        <ListaDeItens itens={NAO_PODE_LEVAR} marcador="✕" />
      </Secao>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: espaco.g, paddingBottom: espaco.gg * 2 },
  nome: { fontSize: 26, fontWeight: '800', color: cores.texto },
  endereco: { fontSize: 17, lineHeight: 24, color: cores.textoSuave, marginTop: 6 },
  distancia: { fontSize: 16, fontWeight: '700', color: cores.primaria, marginTop: 8 },
  botao: { marginVertical: espaco.g },
  situacao: { fontSize: 17, fontWeight: '700', marginBottom: 6 },
});
