import { Linking, ScrollView, StyleSheet, Text } from 'react-native';
import { Botao } from '../components/Botao';
import { ListaDeItens, Secao, estilosTexto } from '../components/Secao';
import {
  AVISO_FERIADOS,
  FONTE_OFICIAL,
  HORARIO_TEXTO,
  NAO_PODE_LEVAR,
  PODE_LEVAR,
  PONTOS_FECHADOS,
} from '../data/pontos';
import { espaco } from '../theme';

export function InformacoesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Secao titulo="O que são os Pontos de Apoio">
        <Text style={estilosTexto.normal}>
          São áreas públicas da Prefeitura de São José do Rio Preto que recebem,
          sem custo, entulho de pequenas obras, objetos volumosos sem uso e
          resíduos verdes, como restos de poda.
        </Text>
      </Secao>

      <Secao titulo="O que pode levar">
        <ListaDeItens itens={PODE_LEVAR} marcador="✓" />
      </Secao>

      <Secao titulo="O que não pode levar">
        <ListaDeItens itens={NAO_PODE_LEVAR} marcador="✕" />
      </Secao>

      <Secao titulo="Horário de funcionamento">
        {HORARIO_TEXTO.map((linha) => (
          <Text key={linha} style={estilosTexto.normal}>
            {linha}
          </Text>
        ))}
        <Text style={estilosTexto.suave}>{AVISO_FERIADOS}</Text>
      </Secao>

      <Secao titulo="Unidades que não estão recebendo">
        <ListaDeItens
          itens={PONTOS_FECHADOS.map((p) => `${p.nome}: ${p.situacao}`)}
          marcador="•"
        />
      </Secao>

      <Secao titulo="Sobre este aplicativo">
        <Text style={estilosTexto.normal}>
          Projeto de extensão universitária (UNINTER – Análise e Desenvolvimento
          de Sistemas). Não é um aplicativo oficial da Prefeitura.
        </Text>
        <Text style={estilosTexto.suave}>
          Endereços, horários e materiais: {FONTE_OFICIAL.nome}, consultado em{' '}
          {FONTE_OFICIAL.consultadoEm}. Dúvidas: Prefeitura,{' '}
          {FONTE_OFICIAL.telefonePrefeitura}.
        </Text>
        <Text style={estilosTexto.suave}>
          Sua localização é usada só no aparelho, para calcular distâncias. Ela
          não é salva nem enviada para nenhum servidor.
        </Text>
      </Secao>

      <Botao
        titulo="Abrir a página da Prefeitura"
        variante="contorno"
        onPress={() => Linking.openURL(FONTE_OFICIAL.url).catch(() => {})}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: espaco.g, paddingBottom: espaco.gg * 2 },
});
