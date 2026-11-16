import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useLocalizacao } from './src/hooks/useLocalizacao';
import { DetalheScreen } from './src/screens/DetalheScreen';
import { InformacoesScreen } from './src/screens/InformacoesScreen';
import { ListaScreen } from './src/screens/ListaScreen';
import { cores, espaco } from './src/theme';
import { PontoComDistancia } from './src/types';

type Tela =
  | { nome: 'lista' }
  | { nome: 'detalhe'; ponto: PontoComDistancia }
  | { nome: 'informacoes' };

const TITULOS = {
  lista: 'Pontos de Apoio',
  detalhe: 'Detalhes do ponto',
  informacoes: 'Informações',
} as const;

export default function App() {
  const [tela, setTela] = useState<Tela>({ nome: 'lista' });
  const { estado, coordenada, pedir } = useLocalizacao();

  const voltar = useCallback(() => setTela({ nome: 'lista' }), []);

  // Botão "voltar" do Android: volta para a lista em vez de fechar o app.
  useEffect(() => {
    const inscricao = BackHandler.addEventListener('hardwareBackPress', () => {
      if (tela.nome === 'lista') return false;
      voltar();
      return true;
    });
    return () => inscricao.remove();
  }, [tela.nome, voltar]);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.topo} edges={['top', 'left', 'right']}>
        <View style={styles.barra}>
          {tela.nome !== 'lista' && (
            <Pressable
              onPress={voltar}
              accessibilityRole="button"
              accessibilityLabel="Voltar para a lista"
              hitSlop={12}
              style={styles.voltar}
            >
              <Text style={styles.voltarTexto}>‹ Voltar</Text>
            </Pressable>
          )}
          <View style={styles.titulos}>
            <Text style={styles.titulo} accessibilityRole="header">
              {TITULOS[tela.nome]}
            </Text>
            {tela.nome === 'lista' && (
              <Text style={styles.subtitulo}>
                Descarte correto em São José do Rio Preto
              </Text>
            )}
          </View>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.corpo} edges={['bottom', 'left', 'right']}>
        {tela.nome === 'lista' && (
          <ListaScreen
            estadoLocalizacao={estado}
            coordenada={coordenada}
            onPedirLocalizacao={pedir}
            onAbrirPonto={(ponto) => setTela({ nome: 'detalhe', ponto })}
            onAbrirInformacoes={() => setTela({ nome: 'informacoes' })}
          />
        )}
        {tela.nome === 'detalhe' && <DetalheScreen ponto={tela.ponto} />}
        {tela.nome === 'informacoes' && <InformacoesScreen />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topo: { backgroundColor: cores.primaria },
  barra: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: espaco.g,
    paddingVertical: espaco.m,
    gap: espaco.m,
  },
  voltar: { minHeight: 44, justifyContent: 'center' },
  voltarTexto: { color: cores.branco, fontSize: 17, fontWeight: '700' },
  titulos: { flex: 1 },
  titulo: { color: cores.branco, fontSize: 22, fontWeight: '800' },
  subtitulo: { color: cores.primariaClara, fontSize: 15, marginTop: 2 },
  corpo: { flex: 1, backgroundColor: cores.fundo },
});
