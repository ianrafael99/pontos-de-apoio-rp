import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PONTOS_DE_APOIO } from '../src/data/pontos';
import { distanciaEmMetros, formatarDistancia, ordenarPontos } from '../src/utils/distancia';
import { filtrarPontos } from '../src/utils/filtro';
import { faixaDoDia, situacaoAgora } from '../src/utils/horario';
import { urlDaRota } from '../src/utils/mapas';

const CENTRO = { latitude: -20.8113, longitude: -49.3758 };

test('dados: 14 pontos, ids únicos, 8 em cada lista oficial, dentro de Rio Preto', () => {
  assert.equal(PONTOS_DE_APOIO.length, 14);
  assert.equal(new Set(PONTOS_DE_APOIO.map((p) => p.id)).size, 14);
  assert.equal(PONTOS_DE_APOIO.filter((p) => p.categorias.includes('verdes')).length, 8);
  assert.equal(PONTOS_DE_APOIO.filter((p) => p.categorias.includes('outros')).length, 8);
  for (const p of PONTOS_DE_APOIO) {
    assert.ok(distanciaEmMetros(CENTRO, p.coordenada) < 15000, p.nome);
  }
});

test('distância: Haversine confere com valor conhecido', () => {
  // 1 grau de latitude ≈ 111,19 km
  const d = distanciaEmMetros({ latitude: 0, longitude: 0 }, { latitude: 1, longitude: 0 });
  assert.ok(Math.abs(d - 111195) < 100);
  assert.equal(distanciaEmMetros(CENTRO, CENTRO), 0);
});

test('distância: formatação em metros e quilômetros', () => {
  assert.equal(formatarDistancia(444), '440 m');
  assert.equal(formatarDistancia(2345), '2,3 km');
});

test('ordenação: por proximidade com localização, alfabética sem', () => {
  const perto = PONTOS_DE_APOIO.find((p) => p.id === 'engenheiro-schmitt')!;
  const ordenados = ordenarPontos(PONTOS_DE_APOIO, perto.coordenada);
  assert.equal(ordenados[0].id, 'engenheiro-schmitt');
  for (let i = 1; i < ordenados.length; i++) {
    assert.ok(ordenados[i].distanciaMetros! >= ordenados[i - 1].distanciaMetros!);
  }
  const alfabetica = ordenarPontos(PONTOS_DE_APOIO, null);
  assert.equal(alfabetica[0].nome, 'Anna Angélica / Gabriela');
  assert.equal(alfabetica[0].distanciaMetros, null);
});

test('filtro: categoria e busca sem acento', () => {
  assert.equal(filtrarPontos(PONTOS_DE_APOIO, 'verdes', '').length, 8);
  assert.deepEqual(
    filtrarPontos(PONTOS_DE_APOIO, 'todos', 'sao francisco').map((p) => p.id),
    ['sao-francisco'],
  );
  assert.equal(filtrarPontos(PONTOS_DE_APOIO, 'outros', 'castelinho').length, 0);
});

test('horário: segunda a sábado 7h–19h, domingo 7h–13h', () => {
  assert.deepEqual(faixaDoDia(0), { abre: 7, fecha: 13 });
  assert.deepEqual(faixaDoDia(6), { abre: 7, fecha: 19 });
  // 14/11/2026 é sábado; 15/11/2026 é domingo.
  assert.equal(situacaoAgora(new Date(2026, 10, 14, 11, 54)).aberto, true);
  assert.equal(situacaoAgora(new Date(2026, 10, 14, 19, 0)).aberto, false);
  assert.equal(situacaoAgora(new Date(2026, 10, 14, 6, 59)).texto, 'Fechado · abre hoje às 7h');
  assert.equal(situacaoAgora(new Date(2026, 10, 15, 12, 59)).aberto, true);
  assert.equal(situacaoAgora(new Date(2026, 10, 15, 13, 0)).texto, 'Fechado · abre amanhã às 7h');
});

test('rota: link universal do Google Maps com o destino', () => {
  assert.equal(
    urlDaRota({ latitude: -20.77, longitude: -49.36 }),
    'https://www.google.com/maps/dir/?api=1&destination=-20.77%2C-49.36',
  );
});
