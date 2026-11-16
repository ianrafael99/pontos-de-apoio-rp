import { Coordenada } from '../types';

/** Link universal do Google Maps: abre o app de mapas instalado ou o navegador. */
export function urlDaRota(destino: Coordenada): string {
  const d = `${destino.latitude},${destino.longitude}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(d)}`;
}
