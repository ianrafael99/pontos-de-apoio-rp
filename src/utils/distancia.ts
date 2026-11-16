import { Coordenada, PontoComDistancia, PontoDeApoio } from '../types';

const RAIO_DA_TERRA_M = 6371000;
const emRadianos = (graus: number) => (graus * Math.PI) / 180;

/** Distância em linha reta entre duas coordenadas, em metros. */
export function distanciaEmMetros(a: Coordenada, b: Coordenada): number {
  const dLat = emRadianos(b.latitude - a.latitude);
  const dLon = emRadianos(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(emRadianos(a.latitude)) *
      Math.cos(emRadianos(b.latitude)) *
      Math.sin(dLon / 2) ** 2;
  return 2 * RAIO_DA_TERRA_M * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function formatarDistancia(metros: number): string {
  if (metros < 1000) {
    return `${Math.round(metros / 10) * 10} m`;
  }
  return `${(metros / 1000).toFixed(1).replace('.', ',')} km`;
}

/**
 * Com a localização do usuário, ordena do mais próximo para o mais distante.
 * Sem localização, ordena por nome.
 */
export function ordenarPontos(
  pontos: PontoDeApoio[],
  origem: Coordenada | null,
): PontoComDistancia[] {
  const comDistancia = pontos.map((p) => ({
    ...p,
    distanciaMetros: origem ? distanciaEmMetros(origem, p.coordenada) : null,
  }));
  return comDistancia.sort((a, b) => {
    if (a.distanciaMetros !== null && b.distanciaMetros !== null) {
      return a.distanciaMetros - b.distanciaMetros;
    }
    return a.nome.localeCompare(b.nome, 'pt-BR');
  });
}
