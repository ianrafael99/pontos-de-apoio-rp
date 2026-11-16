import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Botao } from '../components/Botao';
import { PontoCard } from '../components/PontoCard';
import { PONTOS_DE_APOIO } from '../data/pontos';
import { EstadoLocalizacao } from '../hooks/useLocalizacao';
import { cores, espaco } from '../theme';
import { Coordenada, PontoComDistancia } from '../types';
import { ordenarPontos } from '../utils/distancia';
import { Filtro, filtrarPontos } from '../utils/filtro';
import { situacaoAgora } from '../utils/horario';

const FILTROS: { valor: Filtro; rotulo: string }[] = [
  { valor: 'todos', rotulo: 'Todos' },
  { valor: 'verdes', rotulo: 'Resíduos verdes' },
  { valor: 'outros', rotulo: 'Outros resíduos' },
];

const MENSAGEM_LOCALIZACAO: Partial<Record<EstadoLocalizacao, string>> = {
  negada:
    'Sem permissão de localização. A lista está em ordem alfabética. Você pode permitir nas configurações do aparelho.',
  desligada:
    'A localização do aparelho está desligada. Ligue o GPS e toque de novo.',
  erro: 'Não foi possível obter sua localização. Tente de novo.',
};

interface Props {
  estadoLocalizacao: EstadoLocalizacao;
  coordenada: Coordenada | null;
  onPedirLocalizacao: () => void;
  onAbrirPonto: (ponto: PontoComDistancia) => void;
  onAbrirInformacoes: () => void;
}

export function ListaScreen({
  estadoLocalizacao,
  coordenada,
  onPedirLocalizacao,
  onAbrirPonto,
  onAbrirInformacoes,
}: Props) {
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [busca, setBusca] = useState('');

  const pontos = useMemo(
    () => ordenarPontos(filtrarPontos(PONTOS_DE_APOIO, filtro, busca), coordenada),
    [filtro, busca, coordenada],
  );
  const situacao = situacaoAgora(new Date());
  const mensagem = MENSAGEM_LOCALIZACAO[estadoLocalizacao];

  const cabecalho = (
    <View>
      <View
        style={[
          styles.situacao,
          { borderLeftColor: situacao.aberto ? cores.aberto : cores.fechado },
        ]}
        accessible
        accessibilityLabel={`Pontos de Apoio: ${situacao.texto}`}
      >
        <Text
          style={[
            styles.situacaoTexto,
            { color: situacao.aberto ? cores.aberto : cores.fechado },
          ]}
        >
          {situacao.texto}
        </Text>
        <Text style={styles.situacaoDetalhe}>
          Seg. a sáb. 7h–19h · Dom. 7h–13h
        </Text>
      </View>

      <Botao
        titulo={
          coordenada ? 'Atualizar minha localização' : 'Mostrar os mais próximos de mim'
        }
        dica="Usa a localização do aparelho para ordenar a lista por distância"
        onPress={onPedirLocalizacao}
        carregando={estadoLocalizacao === 'buscando'}
        variante={coordenada ? 'contorno' : 'cheio'}
      />
      {mensagem && <Text style={styles.aviso}>{mensagem}</Text>}

      <TextInput
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar por nome ou rua"
        placeholderTextColor={cores.textoSuave}
        accessibilityLabel="Buscar Ponto de Apoio por nome ou rua"
        style={styles.busca}
        returnKeyType="search"
        autoCorrect={false}
      />

      <View style={styles.filtros} accessibilityRole="radiogroup">
        {FILTROS.map((f) => {
          const ativo = filtro === f.valor;
          return (
            <Pressable
              key={f.valor}
              onPress={() => setFiltro(f.valor)}
              accessibilityRole="radio"
              accessibilityState={{ selected: ativo }}
              accessibilityLabel={`Filtrar: ${f.rotulo}`}
              style={[styles.filtro, ativo && styles.filtroAtivo]}
            >
              <Text style={[styles.filtroTexto, ativo && styles.filtroTextoAtivo]}>
                {f.rotulo}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.contagem}>
        {pontos.length} {pontos.length === 1 ? 'ponto' : 'pontos'} ·{' '}
        {coordenada ? 'do mais próximo ao mais distante' : 'em ordem alfabética'}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={pontos}
      keyExtractor={(p) => p.id}
      contentContainerStyle={styles.lista}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={cabecalho}
      ListEmptyComponent={
        <Text style={styles.vazio}>
          Nenhum Ponto de Apoio encontrado com essa busca.
        </Text>
      }
      ListFooterComponent={
        <Botao
          titulo="O que posso levar? · Sobre o app"
          variante="contorno"
          onPress={onAbrirInformacoes}
        />
      }
      renderItem={({ item, index }) => (
        <PontoCard
          ponto={item}
          maisProximo={index === 0 && item.distanciaMetros !== null}
          onPress={() => onAbrirPonto(item)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: { padding: espaco.g, paddingBottom: espaco.gg * 2 },
  situacao: {
    backgroundColor: cores.cartao,
    borderRadius: 12,
    borderLeftWidth: 6,
    padding: espaco.m,
    marginBottom: espaco.m,
  },
  situacaoTexto: { fontSize: 17, fontWeight: '700' },
  situacaoDetalhe: { fontSize: 15, color: cores.textoSuave, marginTop: 2 },
  aviso: {
    marginTop: espaco.p,
    padding: espaco.m,
    borderRadius: 10,
    backgroundColor: cores.avisoFundo,
    color: cores.aviso,
    fontSize: 15,
    lineHeight: 21,
  },
  busca: {
    marginTop: espaco.m,
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.cartao,
    paddingHorizontal: espaco.g,
    fontSize: 17,
    color: cores.texto,
  },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: espaco.m },
  filtro: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.cartao,
  },
  filtroAtivo: { backgroundColor: cores.primaria, borderColor: cores.primaria },
  filtroTexto: { fontSize: 15, fontWeight: '600', color: cores.texto },
  filtroTextoAtivo: { color: cores.branco },
  contagem: {
    marginTop: espaco.g,
    marginBottom: espaco.p,
    fontSize: 15,
    color: cores.textoSuave,
  },
  vazio: {
    fontSize: 16,
    color: cores.textoSuave,
    textAlign: 'center',
    marginVertical: espaco.gg,
  },
});
