export type Categoria = 'verdes' | 'outros';

export interface Coordenada {
  latitude: number;
  longitude: number;
}

export interface PontoDeApoio {
  id: string;
  nome: string;
  /** Endereço exatamente como publicado pela Prefeitura. */
  endereco: string;
  /** Listas em que o ponto aparece na página oficial. */
  categorias: Categoria[];
  coordenada: Coordenada;
  /** true quando a posição no mapa ainda precisa ser conferida no local. */
  coordenadaAConfirmar?: boolean;
}

export interface PontoComDistancia extends PontoDeApoio {
  /** Distância em linha reta, em metros. null quando não há localização. */
  distanciaMetros: number | null;
}

export interface FaixaHorario {
  abre: number; // hora cheia, 0–23
  fecha: number;
}
