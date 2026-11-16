import { useCallback, useState } from 'react';
import * as Location from 'expo-location';
import { Coordenada } from '../types';

export type EstadoLocalizacao =
  | 'inicial'
  | 'buscando'
  | 'pronta'
  | 'negada'
  | 'desligada'
  | 'erro';

/**
 * Pede a localização só quando o usuário toca no botão.
 * A posição fica apenas na memória do aparelho: não é salva nem enviada.
 */
export function useLocalizacao() {
  const [estado, setEstado] = useState<EstadoLocalizacao>('inicial');
  const [coordenada, setCoordenada] = useState<Coordenada | null>(null);

  const pedir = useCallback(async () => {
    setEstado('buscando');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setEstado('negada');
        return;
      }
      if (!(await Location.hasServicesEnabledAsync())) {
        setEstado('desligada');
        return;
      }
      const posicao =
        (await Location.getLastKnownPositionAsync({ maxAge: 120000 })) ??
        (await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }));
      setCoordenada({
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
      });
      setEstado('pronta');
    } catch {
      setEstado('erro');
    }
  }, []);

  return { estado, coordenada, pedir };
}
